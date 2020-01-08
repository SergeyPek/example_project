<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'headline', 'content', 'user_id', 'external_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'user_id', 'external_id'
    ];

    /**
     * Get the author user of the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
