'use client';

import { useEffect, useState } from 'react';
import { ImagePlus, Loader2, Plus } from 'lucide-react';

import { Hero } from '@/types/heroManagement';
import { HeroService } from '@/services/hero-management.service';

import HeroModal from './HeroModal';
import HeroCard from './HeroCard';
import LoadingSpinner from '../../shared/dashboard/LoadingSpinner';

const HeroManagement = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | null>(null);

  // =========================
  // Fetch Heroes
  // =========================

  const fetchHeroes = async () => {
    try {
      setLoading(true);

      const response = await HeroService.getAllHeroes();

      const data = response.data;

      setHeroes(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      console.error('Failed to fetch heroes:', error);
      setHeroes([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Initial Fetch
  // =========================

  useEffect(() => {
    let cancelled = false;

    const loadHeroes = async () => {
      try {
        const response = await HeroService.getAllHeroes();

        if (cancelled) return;

        const data = response.data;

        setHeroes(Array.isArray(data) ? data : data ? [data] : []);
      } catch (error) {
        if (cancelled) return;

        console.error('Failed to fetch heroes:', error);

        setHeroes([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadHeroes();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================
  // Create
  // =========================

  const handleCreate = () => {
    setEditingHero(null);
    setModalOpen(true);
  };

  // =========================
  // Edit
  // =========================

  const handleEdit = (hero: Hero) => {
    setEditingHero(hero);
    setModalOpen(true);
  };

  // =========================
  // Close
  // =========================

  const handleClose = () => {
    setModalOpen(false);
    setEditingHero(null);
  };

  // =========================
  // Success
  // =========================

  const handleSuccess = async () => {
    handleClose();
    await fetchHeroes();
  };

  // =========================
  // Delete
  // =========================

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this hero?',
    );

    if (!confirmDelete) return;

    try {
      await HeroService.deleteHero(id);

      setHeroes(prev => prev.filter(hero => hero.id !== id));
    } catch (error) {
      console.error('Failed to delete hero:', error);

      alert('Failed to delete hero');
    }
  };

  return (
    <div className="space-y-5">
      {/* =========================
          Header
      ========================= */}

      <div className="rounded-md border bg-background p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <ImagePlus className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h1 className="text-xl font-bold md:text-2xl">Hero Management</h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage homepage offers and banners
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Hero
          </button>
        </div>
      </div>

      {/* =========================
          Loading
      ========================= */}

      {loading ? (
        <LoadingSpinner message="Heroes" />
      ) : heroes.length === 0 ? (
        /* =========================
            Empty
        ========================= */

        <div className="rounded-md border border-dashed px-6 py-16 text-center">
          <ImagePlus className="mx-auto h-10 w-10 text-muted-foreground" />

          <h2 className="mt-4 text-lg font-semibold">No Hero Found</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first homepage hero.
          </p>

          <button
            type="button"
            onClick={handleCreate}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
            Create Hero
          </button>
        </div>
      ) : (
        /* =========================
            Hero List
        ========================= */

        <div className="space-y-5">
          {heroes.map((hero, index) => (
            <HeroCard
              key={hero.id}
              hero={hero}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* =========================
          Modal
      ========================= */}

      {modalOpen && (
        <HeroModal
          key={editingHero?.id ?? 'create'}
          open={modalOpen}
          hero={editingHero}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default HeroManagement;
