import { useEffect, useState } from 'react';
import { GameService } from '@/services/Services';

/**
 * Custom hook to fetch and sort games from GameService
 * @param {number} limit - Max number of games to return
 * @returns {Object} { games, loading }
 */
export function useGames(limit = 15) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await GameService.getAllGames();
                const sorted = (data || [])
                    .sort((a, b) => new Date(b.released || 0) - new Date(a.released || 0))
                    .slice(0, limit);
                if (mounted) setGames(sorted);
            } catch (err) {
                console.error('useGames: veri çekme hatası', err);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => { mounted = false; };
    }, [limit]);

    return { games, loading };
}
