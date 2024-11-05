'use client';

import React, { useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate-common/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/use-chat';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';

export function PlateEditor() {
  const containerRef = useRef(null);

  const editor = useCreateEditor();

  useEffect(() => {
    const text = editor.api.markdown.deserialize(`**Exploring Narrative Perspectives in Literature**
The tutoring session delved ~~into the intricacies~~ of point of view in literature, focusing on first, second, and third-person narration techniques. The tutor guided the student through the nuances of third-person narration, including omniscient, limited, and objective perspectives. Through text analysis, the session emphasized the importance of pronoun usage in identifying narrative viewpoints.
**Topics Covered:**
1. Point of View in Literature
   - Examined first, second, and third-person perspectives
   - Focused on pronoun usage for identification
   - Analyzed text examples to determine narrative voice
2. Types of Third-Person Narration
   - Explored omniscient, limited, and objective perspectives
   - Discussed ~~characteristics~~ of each narration style
   - Evaluated sample texts to distinguish between types
3. Pronoun Analysis for Narrative Identification
   - Studied pronoun usage patterns in different points of view
   - Differentiated between first-person (I/me), second-person (you), and third-person (he/she/they) narration
   - Applied pronoun analysis to determine narrator's perspective and knowledge`)
    editor.tf.setValue(text);
  }, [editor]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <EditorContainer
          id="scroll_container"
          ref={containerRef}
          variant="demo"
        >
          <Editor variant="demo" />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>

          <CommentsPopover />

          <CursorOverlay containerRef={containerRef} />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
