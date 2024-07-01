import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import HomeLayout from "../../Layouts/HomeLayout";
//import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box className="bg-base-200 px-6 py-2 min-h-auto">
      <HomeLayout>
        <Box className="min-h-auto bg-base-200 pl-10 pr-0 py-4">
          <HStack spacing={4}>
            <Box w="70%">
              <LanguageSelector language={language} onSelect={onSelect} />
              <Editor
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
                height="75vh"
                theme="vs-dark"
                language={language}
                defaultValue={CODE_SNIPPETS[language]}
                onMount={onMount}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </Box>
            <Output editorRef={editorRef} language={language} />
          </HStack>
        </Box>
      </HomeLayout>
    </Box>
  );
};

export default CodeEditor;
