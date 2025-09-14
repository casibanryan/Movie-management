<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use Illuminate\Support\Facades\Storage;

class ProcessVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $videoPath;
    protected $videoId;



    public function __construct(string $videoPath, int $videoId)
    {
        $this->videoPath = $videoPath;
        $this->videoId = $videoId;
    }

    public function handle(): void
    {
        $disk = Storage::disk('public');
        $video = FFMpeg::fromDisk($disk)->open($this->videoPath);

        $video->getFrameFromSeconds(5)
            ->export()
            ->toDisk('public')
            ->save("thumbnails/{$this->videoId}.jpg");

        // $video->exportForHLS()
        //     ->toDisk('public')
        //     ->save("hls/{$this->videoId}/playlist.m3u8");
    }
}
