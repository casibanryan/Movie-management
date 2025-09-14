<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Movie;
use App\Jobs\ProcessVideo;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->query = Movie::query();
        $this->apply();

        $movies = $this->paginate();

        return response()->json($movies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'string|max:255',
            'video_file' => 'required|file|mimetypes:video/mp4,video/webm,video/quicktime|max:100000',
        ]);

        $file = $request->file('video_file');
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $fileName = Str::slug($originalName) . '-' . time() . '.' . $file->extension();
        $videoPath = $file->storeAs('movies', $fileName, 'public');

        $movie = Movie::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'video_file' => $videoPath,
        ]);

        ProcessVideo::dispatch($videoPath, $movie->id);

        return response()->json([
            'message' => 'Movie is being processed.',
            'movie' => $movie,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
