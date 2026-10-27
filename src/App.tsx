import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, Header } from "./components";
import {
  AboutPage,
  ArticlePage,
  CategoriesPage,
  CategoryPage,
  ContactPage,
  HomePage,
  LatestPage,
  NotFoundPage,
  SavedPage,
  SearchPage,
  TrendingPage,
} from "./pages";
import { fetchLiveStories, stories as sampleStories } from "./data";
import type { Story } from "./data";
import { getBookmarks, getTheme, saveTheme, toggleBookmark } from "./storage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">(() => getTheme());
  const [savedIds, setSavedIds] = useState<string[]>(() => getBookmarks());
  const [stories, setStories] = useState<Story[]>(sampleStories);
  const [liveLoading, setLiveLoading] = useState(Boolean(import.meta.env.VITE_GNEWS_API_KEY));
  const [liveError, setLiveError] = useState<string | null>(null);
  const liveEnabled = Boolean(import.meta.env.VITE_GNEWS_API_KEY);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!liveEnabled) return;
    let active = true;
    fetchLiveStories()
      .then((liveStories) => {
        if (active && liveStories.length) {
          setStories([...liveStories, ...sampleStories]);
          setLiveError(null);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setLiveError(error instanceof Error ? error.message : "The configured news source could not be reached.");
          console.error("Could not load live news.", error);
        }
      })
      .finally(() => {
        if (active) setLiveLoading(false);
      });
    return () => { active = false; };
  }, [liveEnabled]);

  async function refreshStories() {
    if (!liveEnabled) return;
    setLiveLoading(true);
    setLiveError(null);
    try {
      const liveStories = await fetchLiveStories();
      if (!liveStories.length) throw new Error("The news source returned no articles.");
      setStories([...liveStories, ...sampleStories]);
    } catch (error) {
      setLiveError(error instanceof Error ? error.message : "The configured news source could not be reached.");
      console.error("Could not refresh live news.", error);
    } finally {
      setLiveLoading(false);
    }
  }

  function handleBookmark(id: string) {
    setSavedIds(toggleBookmark(id));
  }

  const sharedProps = {
    stories,
    savedIds,
    onBookmark: handleBookmark,
    liveEnabled,
    liveLoading,
    liveError,
    onRefresh: refreshStories,
  };

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={location.pathname + location.search} className="route-content" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
          <Routes location={location}>
            <Route path="/" element={<HomePage {...sharedProps} />} />
            <Route path="/latest" element={<LatestPage {...sharedProps} />} />
            <Route path="/trending" element={<TrendingPage {...sharedProps} />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:category" element={<CategoryPage {...sharedProps} />} />
            <Route path="/article/:slug" element={<ArticlePage stories={stories} savedIds={savedIds} onBookmark={handleBookmark} />} />
            <Route path="/search" element={<SearchPage {...sharedProps} />} />
            <Route path="/saved" element={<SavedPage stories={stories} savedIds={savedIds} onBookmark={handleBookmark} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
