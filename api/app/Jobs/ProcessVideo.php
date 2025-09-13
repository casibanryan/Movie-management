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


    /**
     * Create a new job instance.
     */
    public function __construct(string $videoPath, int $videoId)
    {
        $this->videoPath = $videoPath;
        $this->videoId = $videoId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Get the video from storage
        $disk = Storage::disk('local');
        $video = FFMpeg::fromDisk($disk)->open($this->videoPath);

        // **Example: Thumbnail Generation**
        $video->getFrameFromSeconds(5)
            ->export()
            ->toDisk('public')
            ->save("thumbnails/{$this->videoId}.jpg");

        // **Example: HLS Generation**
        $video->exportForHLS()
            ->toDisk('public')
            ->addFormat(new \FFMpeg\Format\Video\X264)
            ->save("hls/{$this->videoId}/playlist.m3u8");
    }
}
