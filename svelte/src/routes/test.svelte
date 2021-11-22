<script>
  import { getDiffStrings } from "$lib/Misc/helper";
  import { getDifferencesBetweenRevisions } from "$lib/Revision/helper";

  // import { getDifferencesBetweenRevisions } from "$lib/Revision/helper";

  // let diff1 = getDifferencesBetweenRevisions({}, { field1: "test", field2: "test123132" });
  // console.log(diff1);
  // let diff2 = getDifferencesBetweenRevisions([], [{ field1: "test" }]);
  // console.log(diff2);
  // let diff3 = getDifferencesBetweenRevisions({ field1: "test" }, {});
  // console.log(diff3);
  // let diff4 = getDifferencesBetweenRevisions([{ field1: "test" }], []);
  // console.log(diff4);
  // import DiffMatchPatch from "diff-match-patch";
  let diff5 = getDifferencesBetweenRevisions({ field1: false }, {});

  let diff = getDiffStrings("dogs bark", "cats bark");
  let nullFalse = null === false;
</script>

{@html diff}
{nullFalse}
