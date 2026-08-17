'use client';

import {
  Pencil,
  Plus,
  Trash2,
  Loader2,
  FolderOpen,
  Image as ImageIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';

import { Category } from '@/types/category.types';
import { CategoryService } from '@/services/category.service';
import LoadingSpinner from '../shared/dashboard/LoadingSpinner';

const CategoryTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [deletingId, setDeletingId] = useState<string | null>(null);

  /**
   * Fetch categories
   */
  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAllCategories();

      setCategories(response?.data?.categories ?? response?.data ?? []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initial fetch
   */
  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();

        if (!mounted) return;

        setCategories(response?.data?.categories ?? response?.data ?? []);
      } catch (error) {
        if (mounted) {
          console.error('Failed to fetch categories:', error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Create
   */
  const handleCreate = () => {
    setCreateOpen(true);
  };

  /**
   * Edit
   */
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedCategory(null);
  };

  /**
   * Delete
   */
  const handleDelete = async (category: Category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(category.id);

      await CategoryService.deleteCategory(category.id);

      setCategories(prev => prev.filter(item => item.id !== category.id));
    } catch (error) {
      console.error('Failed to delete category:', error);
    } finally {
      setDeletingId(null);
    }
  };

  /**
   * Refetch after create/update
   */
  const handleSuccess = async () => {
    await fetchCategories();
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-border">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Categories
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
            Manage your product categories and hierarchy
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Plus className="h-4 w-4 shrink-0" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner message="categories" />
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center text-muted-foreground space-y-3 px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <FolderOpen className="h-6 w-6 text-muted-foreground/80" />
            </div>
            <div className="space-y-1 max-w-xs">
              <p className="text-sm sm:text-base font-semibold text-foreground">
                No categories found
              </p>
              <p className="text-xs text-muted-foreground">
                Get started by creating a new category above.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* 1. Mobile Card View (< md) */}
            <div className="block md:hidden divide-y divide-border">
              {categories.map(category => (
                <div key={category.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Image */}
                      {category.image ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}

                      {/* Name & Slug */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm text-foreground truncate">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          {category.slug}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="shrink-0">
                      {category.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/50">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs transition-all hover:bg-accent active:scale-95"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      disabled={deletingId === category.id}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-semibold text-destructive shadow-2xs transition-all hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
                    >
                      {deletingId === category.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      <span>
                        {deletingId === category.id ? 'Deleting...' : 'Delete'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Desktop Table View (≥ md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs uppercase font-semibold text-muted-foreground tracking-wider">
                    <th scope="col" className="px-5 py-3.5 w-20">
                      Image
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Name
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Slug
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border text-sm font-medium">
                  {categories.map(category => (
                    <tr
                      key={category.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      {/* Image */}
                      <td className="px-5 py-3.5">
                        {category.image ? (
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                            <Image
                              src={category.image}
                              alt={category.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground">
                            <ImageIcon className="h-5 w-5" />
                          </div>
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-5 py-3.5 font-semibold text-foreground">
                        {category.name}
                      </td>

                      {/* Slug */}
                      <td className="px-5 py-3.5">
                        <span className="inline-block font-mono text-xs text-muted-foreground bg-muted/60 px-2 py-1 rounded border border-border/50">
                          {category.slug}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        {category.isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(category)}
                            className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(category)}
                            disabled={deletingId === category.id}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-semibold text-destructive shadow-2xs transition-all hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
                          >
                            {deletingId === category.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                            <span>
                              {deletingId === category.id
                                ? 'Deleting...'
                                : 'Delete'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Create Modal */}
      <CategoryCreate
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={handleSuccess}
      />

      {/* Edit Modal */}
      <CategoryEdit
        category={selectedCategory}
        open={editOpen}
        onClose={handleCloseEdit}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default CategoryTable;
