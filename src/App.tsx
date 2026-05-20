import { ContactProvider } from '@/capabilities/contact';
import { PantryProvider } from '@/capabilities/pantry';
import { RecipeSuggestionsProvider } from '@/capabilities/recipe-suggestions';
import { MainRouter } from '@/routes/MainRouter';

const App = () => (
  <PantryProvider>
    <RecipeSuggestionsProvider>
      <ContactProvider>
        <MainRouter />
      </ContactProvider>
    </RecipeSuggestionsProvider>
  </PantryProvider>
);

export default App;
