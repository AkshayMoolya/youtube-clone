import React from "react";
import "./App.css";
import { AppContext } from "./context/contextApi";
import Feed from "./components/Feed";
import Headers from "./components/Headers";
import LeftNav from "./components/LeftNav";
import LeftNewMenuItems from "./components/LeftNewMenuItems";
import SearchResult from "./components/SearchResult";
import SearchResultVideoCard from "./components/SearchResultVideoCard";
import SuggestionVideoCard from "./components/SuggestionVideoCard";
import VideoCard from "./components/VideoCard";
import VideoDetails from "./components/VideoDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Headers />
          <Routes>
            <Route path="/" exact element={<Feed />}  />
            <Route
              path="/searchResults/:searchQuery"
              element={<SearchResult />}
            />
            <Route path="/video/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
