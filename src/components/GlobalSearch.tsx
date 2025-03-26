
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import AISearchDialog from "./AISearchDialog";

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [aiSearchOpen, setAiSearchOpen] = useState(false);
  
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="w-full md:w-40 lg:w-64 justify-start text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search in StayBeyond..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setAiSearchOpen(true);
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search with AI</span>
            </CommandItem>
            <CommandItem onSelect={() => window.location.href = "/listings"}>
              <span>All Listings</span>
            </CommandItem>
            <CommandItem onSelect={() => window.location.href = "/transport-listings"}>
              <span>Transport Options</span>
            </CommandItem>
            <CommandItem onSelect={() => window.location.href = "/community"}>
              <span>Community Recommendations</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Popular Destinations">
            <CommandItem onSelect={() => window.location.href = "/listings?location=Mumbai"}>
              <span>Mumbai</span>
            </CommandItem>
            <CommandItem onSelect={() => window.location.href = "/listings?location=Delhi"}>
              <span>Delhi</span>
            </CommandItem>
            <CommandItem onSelect={() => window.location.href = "/listings?location=Goa"}>
              <span>Goa</span>
            </CommandItem>
            <CommandItem onSelect={() => window.location.href = "/listings?location=Kerala"}>
              <span>Kerala</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      
      <AISearchDialog open={aiSearchOpen} onOpenChange={setAiSearchOpen} />
    </>
  );
};

export default GlobalSearch;
