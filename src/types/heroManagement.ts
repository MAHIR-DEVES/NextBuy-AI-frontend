export interface HeroOffer {
  image: string;
  shortTitle: string;
  discount: string;
  shortDescription: string;
  link: string;
  isShowing: boolean;
}

export interface HeroBanner {
  image: string;
  isShowing: boolean;
}

export interface Hero {
  id: string;
  offer: HeroOffer;
  banner: HeroBanner;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHeroPayload {
  offer: HeroOffer;
  banner: HeroBanner;
}

export interface UpdateHeroPayload {
  offer?: Partial<HeroOffer>;
  banner?: Partial<HeroBanner>;
}

export interface HeroApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
