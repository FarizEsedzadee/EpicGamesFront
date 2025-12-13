import data from '@/data/data.json'

export const GameService = {
    getAllGames: async () => {
        try {
            console.log(data);
            return data.results || [];
        } catch (error) {
            console.error("Oyunlar çekilirken hata oluştu:", error);
            throw error;
        }
    }
};
