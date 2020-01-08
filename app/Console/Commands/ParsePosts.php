<?php

namespace App\Console\Commands;

use App\Post;
use App\User;
use Goutte\Client as GoutteClient;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Guzzle\Http\Client as GuzzleClient;

class ParsePosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'posts:parse';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parse posts from Reddit';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $goutteClient = new GoutteClient();
        $guzzleClient = new GuzzleClient();
        $guzzleClient->setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A404 Safari/601.1');

        $crawler = $goutteClient->request('GET', 'https://www.reddit.com/');
        $content = $crawler->filter('script#data')->text();
        $json = Str::before(Str::after($content, 'window.___r = '), '; window.___prefetches');
        $data = json_decode($json, true);

        $postUrls = collect(array_map(function($post) {
            return $post['permalink'];
        }, array_values($data['posts']['models'])));

        $postUrls->chunk(10)->each(function($chunkedPostUrls) use ($guzzleClient) {
            $requests = $chunkedPostUrls->map(function($url) use ($guzzleClient) {
                return $guzzleClient->get($url . '.json');
            })->toArray();
            $responses = $guzzleClient->send($requests);
            foreach ($responses as $response) {
                try {
                    $postData = $response->json()[0]['data']['children'][0]['data'];

                    if ($postData['id']) {
                        DB::transaction(function () use ($postData) {
                            $user = null;

                            if ($postData['author_fullname'] && $postData['author']) {
                                $user = User::firstOrCreate(
                                    ['external_id' => $postData['author_fullname']],
                                    ['username' => $postData['author'], '']
                                );
                            }

                            Post::firstOrCreate(
                                ['external_id' => $postData['id']],
                                ['headline' => $postData['title'], 'content' => $postData['selftext'], 'user_id' => $user ? $user->id : null]
                            );
                        });
                    }

                }
                catch (\Exception $exception) {

                }
            }
        });
    }
}
