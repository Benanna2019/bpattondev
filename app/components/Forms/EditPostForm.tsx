// This form and <AddPostForm /> will be virtually the same

// The only difference is that the action will be either

// hyper.data.add or
// hyper.data.update

// updating/editing a document only requires the id and the fields that have changed.

// So I will need an action at /writing/$writingId/edit that
// calls an update function that I need to pass to an updatePost function

// TODO: Create an updatePost function in post.server.ts
export default {};
