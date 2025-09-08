import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search heart-healthy exercises..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-14 pl-12 pr-4 text-lg bg-medical-blue text-white placeholder:text-blue-200 border-0 rounded-full shadow-medical focus:ring-2 focus:ring-white/20"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5" />
        <Button
          type="submit"
          className="absolute right-2 top-2 h-10 px-6 bg-white text-medical-blue hover:bg-blue-50 rounded-full font-semibold transition-smooth"
        >
          Search
        </Button>
      </div>
    </form>
  );
};