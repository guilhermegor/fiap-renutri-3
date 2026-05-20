/**
 * Recipe entities are passthrough — the DTO shape and the domain
 * shape are identical here. Kept as a separate module to mirror the
 * BlueprintX convention, even though there's no DTO ↔ entity divergence
 * for static read-only content.
 */

import { RecipeDTO } from './dto';

export type Recipe = RecipeDTO;
