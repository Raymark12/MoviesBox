import { useState, useRef, useEffect } from "react";
import { Input, InputGroup } from "@chakra-ui/react";
import { useSearchParams } from "react-router";
import { IoIosSearch } from "react-icons/io";

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isTypingRef = useRef(false);

  useEffect(() => {
    if (!isTypingRef.current) {
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    isTypingRef.current = true;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      if (value.trim()) {
        setSearchParams({ q: value });
      } else {
        setSearchParams({});
      }
    }, 300);
  };

  return (
    <InputGroup startElement={<IoIosSearch size={20} color="grey.light" />}>
      <Input
        value={query}
        onChange={handleChange}
        placeholder="Search movies"
        aria-label="Search movies"
        border="1px solid"
        borderColor="grey.border"
        bg="text.primary"
        color="bg.dark"
        _placeholder={{ color: "text.secondary" }}
        h="45px"
        w="100%"
        borderRadius="md"
      />
    </InputGroup>
  );
}
