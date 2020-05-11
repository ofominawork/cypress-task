describe('TOC tree navigation test', () => {
    //TODO: change "Getting started" item in tests to different items from TOC
    //TODO: Refactor
    //TODO: Think about better titles of tests

    beforeEach(() => {
        cy.visit('https://www.jetbrains.com/help/idea/installation-guide.html');
    });

    /* TOC tests */

    /**
     * @P1
     */
    it('shows TOC', () => {
        cy.get('[data-test=toc]').should('be.visible');
    });

    /**
     * @P1
     * @Automate
     */
    it('scrolls TOC ', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: scroll TOC
        //expected:
        // - scroll bar appears
        // - all TOC items can be seen
    });

    /**
     * @P3
     * @Automate
     * try to automate comparing names of TOC items in the document from which TOC was generated
     */
    it('clicks all TOC items', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: click all TOC items
        //expected:
        // - all TOC items are expanded
        // - all titles of TOC items correspond the document from which TOC was generated
        // - indents are correct
        // - items can be scrolled
    });


    /* article tests */

    /**
     * @P1
     *  TODO: investigate if there is a better way to work with timeouts (see wait)
     */
    it('shows article', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll='Getting_started']";
        var header = "h1 span span.article__title";
        cy.get(item).click();
        cy.wait(1000);
        cy.get(header).then((title) => {
            assert.equal(title.text(), "Getting started");
        });
    });

    //@P2
    it('shows previous article', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll='d10e258']";
        cy.get(selector).click();
        cy.get('h1 span span.article__title').then((sp) => {
            assert.equal(sp.text(), "Install IntelliJ IDEA");
        });
    });

    //@P3
    it('checks article after expander-icon closed', () => {
        var header = "h1 span span.article__title";
        var selector = "ul[data-test='toc'] li[data-toc-scroll='Getting_started'] a svg";
        cy.get(header).then((sp) => {
            var before = sp.text();
            cy.get(selector)
                .click().click();
            cy.get(header).then((sp1) => {
                var after = sp1.text();
                assert.equal(before, after);
            });
        });
    });

    //@P3
    it('checks article after expander-icon opened', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll='Getting_started'] a svg";
        var header = "h1 span span.article__title";
        cy.get(header).then((titleBefore) => {
            var before = titleBefore.text();
            cy.get(selector)
                .click();
            cy.get(header).then((titleAfter) => {
                var after = titleAfter.text();
                assert.equal(before, after);
            });
        });
    });

    /* children tests */

    /**
     * @P1
     * At the moment test compares only the number of expanded children
     * but it is more correct to compare titles of expanded children as well
     * TODO: compare children titles
     */
    it('shows children after TOC item click', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started']";
        cy.get(selector)
            .as("item").then(() => {
            cy.get("@item").next().then((nextBefore) => {
                cy.get("@item").click();
                cy.get("@item").next().then((nextAfter) => {
                    cy.get("@item").nextUntil(nextBefore).should('have.length', 9);
                });
            });
        });
        //+expected: children titles correspond some document from which TOC is generated
    });

    /**
     * @P2
     * At the moment test compares only the number of expanded children
     * but it is more correct to compare titles of expanded children as well
     * TODO: compare children titles
     */
    it('shows children after expander click', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started']";
        cy.get(selector)
            .as("item").then(() => {
            cy.get("@item").next().then((nextBefore) => {
                cy.get("@item").children("a").children("svg").click();
                cy.get("@item").next().then((nextAfter) => {
                    cy.get("@item").nextUntil(nextBefore).should('have.length', 9);
                    assert.equal(nextAfter.text().trim(), 'Overview of the user interface');
                });
            });
        });
    });

    //@P3
    /**
     *  I have noticed that:
     *  1. clicking the item with article and children twice doesn't collapse children
     *  (but expandes if the item is clicked once)
     *  2. clicking the item wo article and children twice collapses children
     *  but from my point of view 1 and 2 should work the same way
     *  so at the moment I check that clicking the item two times expandes/collapses children
     *  TODO: clarify the behaviour
     */
    it('hides children after TOC item click', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started']";
        cy.get(selector).as("item")
            .then(() => {
                cy.get("@item").next().then((before) => {
                    cy.get("@item").click().click();
                    //cy.get("@item").click();
                    cy.get("@item").next().then((after) => {
                        assert.equal(before.text(), after.text()
                            , "See comment before test");
                    });
                });
            });
    });

    //@P3
    it('shows children after TOC item wo article click', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll = 'd10e258']";
        cy.get(selector).as("item")
            .then(() => {
                cy.get("@item").next().then((before) => {
                    cy.get("@item").click();
                    cy.get("@item").next().then((after) => {
                        cy.get("@item").nextUntil(before).should('have.length', 12);
                    });
                });
            });
    });

    //@P3
    it('hides children after TOC item wo article click', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll = 'd10e258']";
        cy.get(selector).as("item")
            .then(() => {
                cy.get("@item").next().then((before) => {
                    cy.get("@item").click().click();
                    //cy.get("@item").click();
                    cy.get("@item").next().then((after) => {
                        assert.equal(before.text(), after.text());
                    });
                });
            });
    });

    //@P2
    it('hides children after expander click', () => {
        cy.get("ul[data-test='toc'] li[data-toc-scroll = 'Getting_started']")
            .as("item").then(() => {
            cy.get("@item").next().then((nextBefore) => {
                cy.get("@item").children("a").children("svg").click().click();
                cy.get("@item").next().then((nextAfter) => {
                    cy.get("@item").nextUntil(nextBefore).should('have.length', 0);
                    assert.equal(nextAfter.text(), nextBefore.text());
                });
            });
        });
    });

    /* font tests */

    /**
     * @P2
     * Checks that the font becomes bold
     * after TOC item is clicked and corresponding article is displayed
     * question: is checking the style enough?
     * TODO: leave only one check either by font-weight or by style
     */
    it('checks font after TOC item click', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started'] a";
        cy.get(selector).as("item")
            .then(() => {
                cy.get("@item").should("have.class", "toc-item");
                cy.get("@item").should('have.css', 'font-weight')
                    .and('eq', "400");
                cy.get("@item").click();
                cy.get("@item").should("have.class", "toc-item toc-item--selected");
                cy.get("@item").should('have.css', 'font-weight')
                    .and('eq', "700");
            });
    });

    //@P3
    it('checks font after TOC item wo article click', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll = 'd10e258'] a";
        cy.get(selector).as("item")
            .then(() => {
                cy.get("@item").should("have.class", "toc-item");
                cy.get("@item").should('have.css', 'font-weight')
                    .and('eq', "400");
                cy.get("@item").click();
                cy.get("@item").should("have.class", "toc-item");
                cy.get("@item").should('have.css', 'font-weight')
                    .and('eq', "400");
            });
    });

    /**
     * @P3
     * @Automate
     */
    it('checks font after expander-icon click', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: click on expander icon left to any TOC item (different from /installation-guide.html)
        //expected: TOC item font doesn't change
    });

    /* hover tests */

    //@P3
    /* Should be checked manually
     * Looks like there are problems with hover in cypress
     */
    it('checks hover', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: put the mouse over the element in TOC
        //expected: grey hover is displayed over the element
    });

    /* expander icon tests */

    //@P3
    //try
    it('opens expander after expander click', () => {
        var selector = "ul[data-test='toc'] li[data-toc-scroll='Getting_started'] a svg";
        cy.get(selector)
            .as("item").then(() => {
            cy.get("@item").click();
            cy.get("@item").should('have.class'
                , "wt-icon wt-icon_size_xs toc-icon toc-icon--opened");
        });
    });



    //@P3
    it('closes expander after expander click', () => {
        cy.get("ul[data-test='toc'] li[data-toc-scroll='Getting_started'] a svg")
            .as("item").then(() => {
            cy.get("@item").click().click();
            cy.get("@item").should('have.class'
                , "wt-icon wt-icon_size_xs toc-icon");
        });
    });



    /**
     * @P3
     * @Automate
     */
    it('opens expander after TOC item click', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: click on the text of any TOC item
        //expected: expand-collapse icon has opened state
    });

    /**
     * @P3
     * @Automate
     */
    it('closes expander after TOC item click', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: click on the text of any TOC item
        //step2: click on the text of the same TOC item
        //expected: expand-collapse icon has default state
    });


    /* TAB tests */

    /**
     * @P3
     * @Automate
     * Try to automate (?? requires some plugin??)
     * TODO: clarify the behaviour
     * At the moment first/second TAB-click doesn't show any frame -> looks like low bug
     * The frame has only upper and lower borders though usually it is a rectangle (but may be it is ok)
     */
    it('checks TAB initial state', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: click "TAB" button on the keyboard
        //expected: first(?) TOC item is shown in blue frame
    });

    /**
     * @P3
     * @Automate
     * Try to automate (?? requires some plugin??)
     */
    it('checks TAB', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: click "TAB" button on the keyboard several times
        //expected: check that TAB highlighting moves from element to element
    });

    /**
     * @P3
     * @Automate
     * Try to automate (?? requires some plugin??)
     */
    it('checks TAB + Enter', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: click "TAB" button on the keyboard : some TOC element with children is selected
        //step2: click "Enter" button
        //expected:
        //- children are expanded
        //- TOC item font is bold (selected) (if TOC item has article)
        //- the corresponding article is shown (if TOC item has article)
    });


    /* double click tests */

    /**
     * @P3
     * @Automate
     */
    it('checks double click on TOC item', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: doubleclick on TOC item
        //expected: corresponding article is opened, expander icon has default state
    });

    /**
     * @P3
     * @Automate
     */
    it('checks double click on expander-icon', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: doubleclick on expander
        //expected: expander icon has default state
    });


    /* indent tests */

    //@P3
    //TODO: indent should be checked for all first level items
    it('checks first level indent', () => {
        cy.get("ul[data-test='toc'] li[data-toc-scroll='Getting_started'] a")
            .should('have.attr', "style")
            .and("eq", "padding-left: 16px;");
    });

    //@P3
    //TODO: indent should be checked for all expanded children
    it('checks second level indent', () => {
        cy.get("ul[data-test='toc'] li[data-toc-scroll='Getting_started']").click().next()
            .children("a")
            .should('have.attr', "style")
            .and("eq", "padding-left: 32px;");
    });

    //@P3
    //TODO: indent should be checked for all expanded children
    it('checks third level indent', () => {
        cy.get("ul[data-test='toc'] li[data-toc-scroll='Configuring_Project_and_IDE_Settings']")
            .click().next().click().next()
            .children("a")
            .should('have.attr', "style")
            .and("eq", "padding-left: 48px;");
    });

    //@P3
    //TODO: indent should be checked for all expanded children
    it('checks fourth level indent', () => {
        cy.get("ul[data-test='toc'] li[data-toc-scroll='Configuring_Project_and_IDE_Settings']")
            .click().next().click().next().click().next()
            .children("a")
            .should('have.attr', "style")
            .and("eq", "padding-left: 64px;");
    });

    /**
     * @P3
     * @Automate
     */
    it('checks fifth level indent', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: Expand Non-JVM Technologies -> PHP -> Debug PHP applications
        // -> Configure a debugging engine -> Configure Xdebug
        //expected: check that left indent = 80px
    });



});
