import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { Button, Card, CommentThread, Composer, Heading, Stack, Text } from "../../src";

const meta: Meta = { title: "Framed/Save recovery", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const FailedSave: Story = {
  name: "Failed save keeps the draft",
  render: () => <Stack gap={4} style={{ maxInlineSize: 720 }}>
    <Heading level="heading">Retry without losing your work</Heading>
    <Text>Type a reply and send it. This example fails immediately and keeps the draft with an inline error.</Text>
    <Card><CommentThread title="Cabinet dimensions" comments={[]} onPost={() => { throw new Error("Offline"); }} /></Card>
    <Card><Composer onSubmit={() => Promise.reject(new Error("Offline"))} /></Card>
  </Stack>,
};

export const PendingSave: Story = {
  name: "A pending save preserves the next draft",
  render: function Render() {
    const finish = useRef<(() => void) | null>(null);
    return <Stack gap={4} style={{ maxInlineSize: 720 }}>
      <Heading level="heading">Keep writing while a message sends</Heading>
      <Text>Send a message, type a different draft, then finish the pending save. The newer draft remains.</Text>
      <Card><Composer onSubmit={() => new Promise<void>((resolve) => { finish.current = resolve; })} /></Card>
      <Button onPress={() => finish.current?.()}>Finish pending save</Button>
    </Stack>;
  },
};
