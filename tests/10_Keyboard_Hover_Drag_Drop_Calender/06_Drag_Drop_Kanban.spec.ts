import { test, expect, Locator } from "@playwright/test";

test('Verify Drag Drop Kanban', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/dnd");

    // ---- Start your code here ----

    let stKanbanBox: Locator = page.getByTestId('kanban-board');
    const tKanbanBox = (await stKanbanBox.boundingBox())!;
    let stTodoBox: Locator = page.getByTestId('col-todo');
    const tTodoBox = (await stTodoBox.boundingBox())!;
    let stInProgressBox: Locator = page.locator('[data-status="in-progress"]');
    const tInProgressBox = (await stInProgressBox.boundingBox())!;
    let stReviewBox: Locator = page.getByTestId('col-review');
    const tReviewBox = (await stReviewBox.boundingBox())!;
    let stDoneBox: Locator = page.getByTestId('col-done');
    const tDoneBox = (await stDoneBox.boundingBox())!;



    let sourceCardWrite: Locator = page.locator('#card-write-spec');
    const sBox = (await sourceCardWrite.boundingBox())!;
    let reviewPR: Locator = page.getByTestId('card-review-pr-21');
    const reviewPRBox = (await reviewPR.boundingBox())!;
    let updateReadMe: Locator = page.getByTestId('card-update-readme');
    const updateReadMeBox = (await updateReadMe.boundingBox())!;
    let bug_42: Locator = page.getByTestId('card-fix-bug-42');
    const bug_42Box = (await bug_42.boundingBox())!;
    let addAxeAudit: Locator = page.getByTestId('card-add-axe-audit');
    const addAxeAuditBox = (await addAxeAudit.boundingBox())!;
    let ciStability: Locator = page.getByTestId('card-ci-stability');
    const ciStabilityBox = (await ciStability.boundingBox())!;
    let docFixture: Locator = page.getByTestId('card-doc-fixtures');
    const docFixtureBox = (await docFixture.boundingBox())!;
    let spikeTrace: Locator = page.getByTestId('card-spike-trace');
    const spikeTraceBox = (await spikeTrace.boundingBox())!;

    //reviewBoard.dragTo(addAxeAudit);    //Test cases is getting passed but board is not moving why ?

    await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2);
    await page.mouse.down();

    await page.mouse.move(tInProgressBox.x + tInProgressBox.width / 2, tInProgressBox.y + tInProgressBox.height / 2, { steps: 20 });
    await page.mouse.up();

    await page.pause();
});
