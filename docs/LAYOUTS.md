# Layouts

How to build a Plumb page. Each pattern below has a working template in Storybook under **Layouts → Page templates**. Start every new screen from the closest template, then swap in your content.

## 1. Pick the frame

| Frame | Use for | Width |
| --- | --- | --- |
| `AppShell` | Everything a signed-in contractor or household member works in. Sidebar navigation, top bar with breadcrumbs, search (`CommandMenu`), notifications (`NotificationsPopover`), and account. Below 960px the sidebar becomes a sheet. | Fluid |
| `PublicShell` | Pages without the workspace: sign-in, shared proposals and approvals, the customer portal, public profiles, marketplace search. | `narrow` 480 · `medium` 880 · `wide` 1280 |
| `Container` | A readable column inside either frame: `text` (720) for forms and reading, `narrow` for single decisions. | 480–1280 |

`AppShell` also takes an `aside`: a persistent side panel for the assistant (`AssistantThread` + `Composer`, F-S09). It's a 380px column from 1200px and a sheet below that (so between 960 and 1200px the sidebar is still a column but the assistant is a sheet; below 960px both are sheets). The sheet only opens when someone asks for it; a top-bar button toggles it (`isAsideOpen` / `onAsideOpenChange`). See the *Estimate editor with assistant panel* template.

Both frames put a **Skip to content** link first and give `<main>` the id `plumb-main`. Use one `<h1>` per page, from `PageHeader`.

## 2. Page anatomy

```
PageHeader        eyebrow · h1 title · meta (lifecycle, status) · actions (one primary) · actionHint
Journey           only on project pages: where the project is (intake → estimate → proposal → record)
Callout           page-level guidance or a problem that blocks the main action
Content grid      see below
Pagination        only for server-paged lists
```

Rules:
- **One primary button per region** (principle 4). The page's primary action lives in `PageHeader`; a card may have its own only if the page header has none.
- **If the primary action is disabled, say why** in `actionHint` (for example from `useProposalBlockers`).
- **Errors go next to the work.** Use `ErrorSummary` at the top of a form after a failed submit, field `errorMessage` at the field, and `Callout tone="danger" live` for a failed action. Toasts confirm finished actions only.

## 3. Content grids

| Layout | Component | Collapses |
| --- | --- | --- |
| Main column + 360px rail (record pages: project, property, contact) | `Grid layout="rail"` | Rail moves below main at 960px |
| Four metrics | `Grid layout="stats"` | 2 across, then 1 |
| Section navigation + form (settings) or filters + results | `Grid layout="sidebar"` | Stacks at 960px |
| Equal columns (form fields, comparisons) | `Grid layout={2}` / `{3}` | 1 column at 960px |
| Card gallery (providers, photos, selections) | `Grid layout="cards"` | Fits as many 280px columns as there is room for |
| Canvas: a drawing, plan, or board that needs the full width (takeoff, floor plan, pipeline) | `Card padding="sm"` around `TakeoffCanvas` / `FloorPlan` / `Board`, no side rail | Full width at every size; boards scroll sideways inside themselves |
| List and detail (inbox, RFIs, documents) | `SplitView` + `NavList` | One pane at a time below 960px; pass `showDetail` and `onBack` (focus moves for you) |

Spacing rhythm: `Stack gap={5}` between cards, `gap={4}` inside a card, `gap={3}` between a group's items. Cards separate by soft shadow, not borders (principle 3).

## 4. Page templates

Each template lists its regions and the components that fill them. Open it in Storybook to see it in light, dark, and at phone width.

| Template | Regions → components | Features |
| --- | --- | --- |
| **Dashboard (Today)** | header: `PageHeader` · metrics: `Grid stats` + `StatCard` · main: `OpenItems` · rail: `EventCalendar view="agenda"` | F-C42, F-C78 |
| **List page** | header: `PageHeader` + primary action · filters: `FilterChips`, `SearchField` · body: `Table` (sort, `onRowAction`, `isLoading`, `emptyState`) · foot: `Pagination` | F-S13 |
| **Record with side rail** | header: `PageHeader` + `LifecycleTag`/`ProposalStatusBadge` · `Journey` · `Grid stats` · main: `OpenItems`, `Timeline` · rail: `DescriptionList`, `TaskList` | F-C10, F-S06 |
| **Estimate editor with assistant panel** | `AppShell aside` = `AssistantThread` + `Composer` · body: `LineItemGrid` (with `rates` → `RatePicker`) | F-C25, F-S09 |
| **Settings** | `Grid sidebar`: `SideNav` (sections, `aria-current`) · form: `ErrorSummary`, fields, `Slider`, `RadioGroup` · usage: `Meter` | F-S22 |
| **Settings · notification preferences** | `Container text` · `CheckboxGroup`, `RadioGroup` | F-S14 |
| **List and detail (questions inbox)** | `SplitView` with `NavList` (list) and `CommentThread` (detail), `onBack` on phones | F-C39, F-M21 |
| **First run** | `EmptyState` with one primary and one secondary action | F-H01, F-C02 |
| **Document review** | `Grid rail`: `SourceViewer` · `FactField` list | F-S07, F-C09 |
| **Step-by-step task** | `Container text` · `Journey` · fields · Back / Continue | F-C02 |
| **Admin · people and access** | `AccessManager` (async revoke through `Dialog onConfirm`) | F-S03 |
| **Mobile · site visit capture** | `AppShell` (sheet nav) · `SyncStatus` · `Callout` · `FileDrop`, `FileItem` · `TaskList` | F-C07, F-S16 |
| **Homeowner · property home** | `FloorPlan` (+ pins, room list) · `EventCalendar` (care) · `DescriptionList` (equipment) | F-H12, F-H19, F-H30, F-H04 |
| **Public · sign in** | `PublicShell narrow` · `<form>` with `TextField`, `PasswordField` | F-S01 |
| **Public · customer portal** | `PublicShell` · `Journey` · `Callout` · `SelectionCard` · `PaymentSchedule readOnly` · `QuestionCard` | F-C35, F-C38 |
| **Public · customer proposal and approval** | `PublicShell` · `ProposalDocument headingLevel={1}` · `ApprovalRequest` | F-C30, F-C34 |
| **Homeowner · request and compare bids** | `PublicShell wide` · `BidLeveling` · `Callout` | F-M16, F-M17 |
| **Public · find a professional** | `PublicShell wide` · `Grid sidebar` (filters: `CheckboxGroup`, `Select`) + `Grid cards` (`ProviderCard`) | F-M05, F-M28 |
| **Board · lead pipeline** | `PageHeader` + primary action · canvas: `Board` (drag, or the Move to menu) | F-C04, F-M14 |
| **Calendar · work and inspections** | `PageHeader` · `EventCalendar headingLevel={2}` (month on desktop, agenda on phones) | F-C43, F-C61, F-H30 |
| **Canvas · plan and takeoff** | `PageHeader` + scale status · canvas: `TakeoffCanvas` with `onScaleChange` | F-C19 |
| **Public · invoice** | `PublicShell` · `InvoiceDocument headingLevel={1}` with `letterhead` and a pay action | F-C50 |
| **Errors · not found, no access, failure** | `EmptyState` (404, no access) · `Callout tone="danger"` (failure, with retry) | F-S15 |

The Workflow section walks one project through intake, estimate, proposal, and property record using the same parts.

## 5. States every page needs

Before a page is done, check each state renders with Plumb components, not one-off markup:

| State | Use |
| --- | --- |
| Loading | `Table isLoading`, `Skeleton`, `Spinner` (last resort), `Button isPending` |
| Empty | `EmptyState` (say what will appear and how to add it) |
| Partial or unknown | `Unknown`, `Money amount={null}`, `· partial` totals |
| Error | `ErrorSummary`, field `errorMessage`, `Callout tone="danger" live`, `Dialog onConfirm` rejection |
| Offline | `SyncStatus` |
| No permission | Hide the action; explain hidden results with counts (`CommandMenu hiddenCount`) |
| Narrow screen | Check at 390px: shells collapse, `Table layout="auto"` stacks rows, `SplitView` shows one pane |

## 6. Finding missing components

When a screen needs something Plumb doesn't have:

1. Identify each region's job, choose the closest template, and discover existing APIs in [COMPONENTS.md](COMPONENTS.md).
2. Compose existing components for a one-off need. Keep application integration and query hooks in the consuming app.
3. For a reusable gap, write a short feature spec with acceptance criteria, add the component with authored intent and named stories, and regenerate the catalog.
4. Add props or semantic tokens for shared behavior and styling; keep authored visual recipes in StyleX.

## Dates, capture, and constrained cards

Use `DateRangePicker` for a work window and `DatePicker` for a single visit. The calendar's solid endpoints mark the selected dates; the pale band connects the days between. Date segments and arrow-key navigation remain available. Use `RangeCalendar` when the month is already part of a scheduling panel, rather than opening a second floating surface.

On phones, `FileDrop` becomes a compact add-files region. Label photo and measurement sections with headings, and use `FileItem status="queued"` for files saved locally while offline; `uploading` means a transfer is active. Keep full filenames and status text available when labels wrap.

A viewport can be wide while a nested content column is narrow. Compose portal selection cards in a `Stack` beside a payment rail; do not divide that narrow column into another pair of fixed columns. Selection status and unknown badges keep their own width. Bid comparisons use labelled cards on phones so each supplier keeps its scope and coverage together; wider screens retain the comparison table.
