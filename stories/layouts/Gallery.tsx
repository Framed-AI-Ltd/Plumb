// The template gallery shown at the top of Layouts → Guide: every page template, linked to its story.
import { Card, Grid, Heading, Link, Stack, Text } from "../../src";
import * as templates from "./Layouts.stories";

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const stories = Object.entries(templates).filter(([k, v]) => k !== "default" && typeof v === "object" && v && "render" in v) as [string, { name?: string }][];

export function TemplateGallery() {
  return (
    <Grid layout="cards" gap={4}>
      {stories.map(([key, story]) => (
        <Card key={key} padding="sm">
          <Stack gap={2}>
            <Heading level="subheading" as="h3">{story.name ?? key}</Heading>
            <Text variant="caption" tone="muted">layouts-page-templates--{kebab(key)}</Text>
            <Link href={`/?path=/story/layouts-page-templates--${kebab(key)}`} target="_top">Open template</Link>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
