<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Keep the public business website at `/` with in-page section anchors; the requested experience is one page.
- Maintain the application schema in a shared client-safe module and submit through a TanStack server function; validation must agree on both sides.
- Store applications in an insert-only RLS-protected Cloud table with no visitor read, update or delete access; applicant details are private.
- Use the publishable server client for consent-validated public submissions instead of privileged credentials; public lead capture needs no admin access.
- Keep the application modal separate from the home page and use existing design-system controls; accessible form behavior must remain reusable.
- Define visual colors in the global stylesheet and load fonts in the root head; semantic styling stays consistent across the page.
