import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./components/Layout";
import BooksList from "./components/BooksList";
import LoadingSkeleton from "./components/Skeleton";

const HomePage = lazy(() => import("./pages/Homepage"));
const BooksPage = lazy(() => import("./pages/BooksPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BookDetailPage = lazy(() => import("./pages/BookDetailPage"));

function App() {
  useEffect(() => {
    window.google.books.load();
  }, []);
  return (
    <Suspense fallback="Loading ...">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="books/" element={<BooksPage />}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Route index element={<BooksList />} />
            </Suspense>
            <Route path=":bookId" element={<BookDetailPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
