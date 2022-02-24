<script>
  import { t } from "svelte-intl-precompile";
</script>

<div>
  <a
    class="underline"
    href="https://ocw.tudelft.nl/wp-content/uploads/Blooms-taxonomy-for-learning-objectives-TU-Delft-Sep-2019.pdf"
    >{$t("english-example")}</a
  >,
  <a
    class="underline"
    href="https://ocw.tudelft.nl/course-lectures/2b-blooms-taxonomy/"
    >{$t("dutch-source")}</a
  >
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {$t("bloom-taxonomhy-process")}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {$t("words")}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {$t("activities")}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {$t("remember")}
                         <br />
                      </div>
                      <div class="text-sm text-gray-500">
                        {$t("remember-description")}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("naming")} <br />
                    {$t("defining")} <br />
                    {$t("describing")} <br />
                    {$t("showing")} <br />
                    {$t("identify")} <br />
                    {$t("collection")}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("quiz")} <br />
                    {$t("definitions")} <br />
                    {$t("facts")} <br />
                    {$t("worksheets")}  <br />
                    {$t("exams")}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {$t("understand")}
                      </div>
                      <div class="text-sm text-gray-500">
                        {$t("understand-description")}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("interpret")} <br />
                    {$t("discuss")} <br />
                    {$t("distinguish")} <br />
                    {$t("classify")} <br />
                    {$t("compare")} <br />
                    {$t("explain")} <br />
                    {$t("conclude")} <br />
                    {$t("predict")}          
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("summary")} <br />
                    {$t("collections")} <br />
                    {$t("lecture")} <br />
                    {$t("example")} <br />
                    {$t("quiz")} <br />
                    {$t("list")} <br />
                    {$t("overview")} <br />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {$t("apply")}
                      </div>
                      <div class="text-sm text-gray-500">
                        {$t("apply-description")}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("apply")} <br />
                    {$t("demonstrate")} <br />
                    {$t("calculate")} <br />
                    {$t("add")} <br />
                    {$t("illustrate")} <br />
                    {$t("show")} <br />
                    {$t("solve")} <br />
                    {$t("research")} <br />
                    {$t("customize")} <br />
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("presentation")} <br/>
                    {$t("illustration")} <br/>
                    {$t("simulatie")} <br/>
                    {$t("demonstrations")} <br/>
                    {$t("interview")} <br/>
                    {$t("log")} <br/>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {$t("analyze")}
                      </div>
                      <div class="text-sm text-gray-500">
                        {$t("analyze-description")}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">

                    {$t("analyze")}  <br/>
                    {$t("seperate")}  <br/>
                    {$t("order")}  <br/>
                    {$t("explain")}  <br/>
                    {$t("connect")}  <br/>
                    {$t("classify")}  <br/>
                    {$t("de-construct")}  <br/>
                    {$t("compare")}  <br/>
                    {$t("select")}  <br/>
                    {$t("distract")} 
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("survey")} <br/>
                    {$t("report")} <br/>
                    {$t("chart")} <br/>
                    {$t("spreadsheet")} <br/>
                    {$t("checklist")} <br/>
                    {$t("map")} <br/>
                    {$t("program")} <br/>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {$t("evaluate")}
                      </div>
                      <div class="text-sm text-gray-500">
                        {$t("evaluate-description")}  
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("judge")}  <br />
                    {$t("order")}  <br />
                    {$t("assess")}  <br />
                    {$t("measure")}  <br />
                    {$t("convince")}  <br />
                    {$t("select")}  <br />
                    {$t("explain")}  <br />
                    {$t("conclude")}  <br />
                    {$t("compare")}  <br />
                    {$t("summarize")}  <br />
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("debate")} <br/>
                    {$t("evaluation")} <br/>
                    {$t("report")} <br/>
                    {$t("rating")} <br/>
                    {$t("conclusion")} <br/>
                    {$t("convincing")} <br/>
                    {$t("speech")}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {$t("creating")}
                      </div>
                      <div class="text-sm text-gray-500">
                        {$t("creating-description")}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("combine")} <br />
                    {$t("schedule")} <br />
                    {$t("design")} <br />
                    {$t("create")} <br />
                    {$t("develop")} <br />
                    {$t("research")} <br />
                    {$t("set-up")} <br />
                    {$t("formulate")} <br />
                    {$t("rewrite")} <br />
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {$t("product")} <br />
                    {$t("project")} <br />
                    {$t("plan")} <br />
                    {$t("game")} <br />
                    {$t("design")} <br />
                    {$t("movie")} <br />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
