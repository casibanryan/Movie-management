<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Movie;
use App\Jobs\ProcessVideo;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;


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
            'title' => 'required|string|max:50|unique:movies,title',
            'description' => 'required|string|max:255',
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

        ProcessVideo::dispatch($videoPath, Str::slug($request->input('title')));

        return response()->json([
            'movie' => $movie,
            'message' => 'upload successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = Movie::find($id);
        return response()->json($movie);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, Movie $movie)
    {
        info($request->input('title'));
        $request->validate([
            'title' => [
                'required',
                'string',
                'max:50',
                Rule::unique('movies')->ignore($movie->id),
            ],
            'description' => 'required|string|max:255',
            'video_file' => 'nullable|file|mimetypes:video/mp4,video/webm,video/quicktime|max:100000',
        ]);

        $movie->title = $request->input('title');
        $movie->description = $request->input('description');

        if ($request->hasFile('video_file')) {
            if ($movie->video_file && Storage::disk('public')->exists($movie->video_file)) {
                Storage::disk('public')->delete($movie->video_file);
            }

            $file = $request->file('video_file');
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $fileName = Str::slug($originalName) . '-' . time() . '.' . $file->extension();
            $videoPath = $file->storeAs('movies', $fileName, 'public');

            $movie->video_file = $videoPath;

            ProcessVideo::dispatch($videoPath, Str::slug($request->input('title')));
        }

        $movie->save();

        return response()->json([
            'movie' => $movie,
            'message' => 'Movie updated successfully'
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie = Movie::find($id);
        $movie->delete();

        return response()->json([
            'message' => 'deleted successfully'
        ]);
    }
}
