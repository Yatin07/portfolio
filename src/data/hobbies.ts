export type Hobbies = {
  chess?: {
    handle?: string;
    openingFavourite?: string;
    rating?: number;
  };
  gym?: {
    prs?: string;
  };
  music?: {
    spotifyEmbedUrl?: string;
  };
  football?: {
    club?: string;
    favouritePlayer?: string;
  };
  editing?: {
    beforeImage?: string;
    afterImage?: string;
    software?: string;
  };
  leetcode?: {
    profileUrl?: string;
  };
  finalNote?: string;
};

// Owner Fill-In Ledger:
// Leave fields empty or commented out until you wish to display them on the site.
// Components will render personal details ONLY if filled in here.
export const hobbies: Hobbies = {
  chess: {
    // handle: 'YatinP',
    // openingFavourite: 'Sicilian Defense',
    // rating: 1600,
  },
  gym: {
    // prs: 'Bench: 80kg | Squat: 110kg | Deadlift: 140kg',
  },
  music: {
    // spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
  },
  football: {
    // club: 'Real Madrid',
    // favouritePlayer: 'Luka Modrić',
  },
  editing: {
    // beforeImage: '/frames/ezgif-frame-120.jpg',
    // afterImage: '/frames/ezgif-frame-120.jpg',
    // software: 'Lightroom / Premiere',
  },
  leetcode: {
    profileUrl: 'https://leetcode.com/u/Yatin07/',
  },
  finalNote: "Thanks for exploring the darkroom! Whether you want to discuss design, chess tactics, or build something great together, feel free to reach out.",
};
