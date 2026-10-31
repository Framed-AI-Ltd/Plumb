// Integration branches permit the explicitly approved solo-maintainer workflow.
export function pullRequestParameters(branch) {
  const solo = ['main', 'develop'].includes(branch);
  return {
    required_approving_review_count: solo ? 0 : 1,
    dismiss_stale_reviews_on_push: true,
    require_code_owner_review: !solo,
    require_last_push_approval: !solo,
    required_review_thread_resolution: true,
    allowed_merge_methods: ['merge'],
  };
}
