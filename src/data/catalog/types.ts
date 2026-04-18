export type CatalogValidationState = "verified" | "unverified" | "needs_review";

export interface CatalogRecord {
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly type: "fdm" | "resin";
  readonly image: string;
  readonly price: number | null;
  readonly amazonAsin: string;
  readonly metadata: {
    readonly buildVolume: {
      readonly x: number | null;
      readonly y: number | null;
      readonly z: number | null;
    };
    readonly layerResolution: {
      readonly min: number | null;
      readonly max: number | null;
    };
    readonly printSpeed: number | null;
    readonly weight: number | null;
    readonly bestFor: readonly string[];
    readonly features: readonly string[];
    readonly scores: {
      readonly value: number | null;
      readonly beginner: number | null;
      readonly printQuality: number | null;
      readonly speed: number | null;
      readonly reliability: number | null;
    };
    readonly summary: string;
    readonly verdict: string;
  };
  readonly validation: {
    readonly state: CatalogValidationState;
    readonly lastVerifiedAt: string | null;
    readonly notes: string | null;
  };
  readonly qa: {
    readonly missingRequiredFields: readonly string[];
  };
  readonly timestamps: {
    readonly createdAt: string;
    readonly updatedAt: string;
  };
  readonly source: {
    readonly dataset: string;
    readonly hash: string;
  };
}

export interface CatalogStore {
  readonly version: number;
  readonly generatedAt: string;
  readonly sourceDataset: string;
  readonly totalRecords: number;
  readonly stats: {
    readonly inserted: number;
    readonly updated: number;
    readonly unchanged: number;
  };
  readonly countsByValidationState: {
    readonly verified: number;
    readonly unverified: number;
    readonly needs_review: number;
  };
  readonly records: readonly CatalogRecord[];
}

export interface CatalogQaReport {
  readonly generatedAt: string;
  readonly sourceDataset: string;
  readonly staleThresholdDays: number;
  readonly totals: {
    readonly records: number;
    readonly duplicateAsins: number;
    readonly rowsWithMissingRequiredFields: number;
    readonly staleRecords: number;
  };
  readonly duplicateAsins: readonly {
    readonly asin: string;
    readonly slugs: readonly string[];
  }[];
  readonly missingRequiredFields: readonly {
    readonly slug: string;
    readonly missingRequiredFields: readonly string[];
  }[];
  readonly staleRecords: readonly {
    readonly slug: string;
    readonly validationState: CatalogValidationState;
    readonly lastVerifiedAt: string | null;
    readonly daysSinceUpdated: number | null;
    readonly daysSinceVerification: number | null;
    readonly reasons: readonly string[];
  }[];
}

