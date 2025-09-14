<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected Request $request;
    protected Builder $query;

    public function __construct(Request $request, Builder $query)
    {

        $this->request = $request;
        $this->query = $query;
    }

    public function apply(): Builder
    {
        $this->applyFilters();
        $this->applySorting();
        return $this->query;
    }

    protected function applyFilters(): void
    {
        $filters = $this->request->query('filter', []);

        foreach ($filters as $field => $value) {
            if (!empty($value)) {
                $this->query->where($field, 'like', "%$value%");
            }
        }
    }

    protected function applySorting(): void
    {
        $sortBy = $this->request->query('sort_by', 'id');
        $sortDir = $this->request->query('sort_dir', 'asc');

        $this->query->orderBy($sortBy, $sortDir);
    }

    public function paginate()
    {
        $perPage = $this->request->query('per_page', 10);
        $page = $this->request->query('page', 1);
        return $this->query->paginate($perPage, ['*'], 'page', $page)
            ->appends($this->request->query());
    }
}
