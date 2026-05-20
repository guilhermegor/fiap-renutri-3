/**
 * Application router.
 *
 * Five routes (the FIAP page budget), all wrapped in MainLayout via a
 * layout route. basename is read from process.env.PUBLIC_PATH so the
 * SPA serves correctly under GitHub Pages's /<repo>/ subpath while
 * still working at root during local dev (where PUBLIC_PATH is unset).
 */

import { BrowserRouter, Route, Routes } from 'react-router';

import { MainLayout } from '@/shared/templates/MainLayout';

import { ContactRoute } from './ContactRoute';
import { HomeRoute } from './HomeRoute';
import { PantryRoute } from './PantryRoute';
import { RecipesRoute } from './RecipesRoute';
import { SobreRoute } from './SobreRoute';

const basename = (process.env.PUBLIC_PATH || '/').replace(/\/$/, '');

export function MainRouter() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomeRoute />} />
          <Route path="despensa" element={<PantryRoute />} />
          <Route path="receitas" element={<RecipesRoute />} />
          <Route path="fale-conosco" element={<ContactRoute />} />
          <Route path="sobre" element={<SobreRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
