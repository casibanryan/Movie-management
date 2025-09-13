<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Movie;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {

    User::updateOrCreate(
      ['email' => 'john_doe@gmail.com'],
      [
        'name' => 'John Doe',
        'email' => 'john_doe@gmail.com',
        'password' => Hash::make('password')
      ]
    );


    Movie::updateOrCreate(
      ['title' => "It's Okay to Not Be Okay"],
      [
        'title' => "It's Okay to Not Be Okay",
        'description' => 'An author with severe antisocial tendencies learns to confront her deep emotional wounds when she meets a stranger who challenges her cold facade.',
        'video_file' => '/sample_video.mp4'
      ]
    );
  }
}
