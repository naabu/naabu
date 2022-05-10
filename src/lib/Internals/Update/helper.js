import { getCurriculumProfile } from "$lib/Goal/Curriculum/Components/helper";

export async function createUpdate(db, $session, updateData) {
  if ($session.player.curriculumProfileId) {
    updateData.curriculumProfile = await getCurriculumProfile(
      db,
      $session.player.curriculumProfileId
    );
  }
  let updatesColRef = db.collection("updates");
  await updatesColRef.add(updateData);
}
