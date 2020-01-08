<?php

namespace App\Console\Commands;

use App\Post;
use App\User;
use Goutte\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Symfony\Component\HttpClient\HttpClient;

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
        $client = new Client();
        $crawler = $client->request('GET', 'https://www.reddit.com/');
        $html = $crawler->filter('script#data')->text();
        $json = Str::before(Str::after($html, 'window.___r = '), '; window.___prefetches');
        $data = json_decode($json, true);

        $postUrls = collect(array_map(function($post) {
            return $post['permalink'];
        }, array_values($data['posts']['models'])));

        $postUrls->each(function ($postUrl, $key) {
            $client = HttpClient::create();
            $response = $client->request('GET', $postUrl . '.json', ['headers' => ['Accept: application/json', 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A404 Safari/601.1']]);
            $postData = json_decode($response->getContent(), true)[0]['data']['children'][0]['data'];
            $user = null;
            if ($postData['id']) {
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
            }
        });
    }
}
