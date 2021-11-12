export async function getCurriculumProfile(db, curriculumProfileId) {
  let profileRef = db
    .collection("curriculumProfile")
    .doc(curriculumProfileId);

  let snap = await profileRef.get();

  if (snap.exists) {
    let profileData = snap.data();
    let curriculumProfile = {
      id: curriculumProfileId,
      fullname: profileData.fullname,
      institution: profileData.institution,
    };
    return curriculumProfile;
  }
  return null;
}