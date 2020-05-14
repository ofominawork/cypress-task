describe('TOC tree navigation test', () => {
    //TODO: Refactor
    //TODO: change "Getting started" item in tests to different items from TOC
    //TODO: Think on adding tests like expand children ->items which were displayed are still displayed
    //TODO: Expander class is checked (see expander icon tests) to verify it is opened-closed,
    // but the class itself is not checked (should be checked manually by watching)
    //TODO: think about making variables item, link, expander, header common for all tests
    //TODO: think about making tests: if has expander than has children, else doesn't have children
    //TODO: indent should be checked for all expanded children (add tests)



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
        // - all TOC items children are expanded
        // - all titles of TOC items correspond the document from which TOC was generated
        // - indents are correct
        // - items can be scrolled
    });


    /* article tests */

    /**
     * @P1
     *  TODO: investigate if there is a better way to work with timeouts (see wait)
     */
    it("shows article", () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll='Getting_started']";
        var header = "h1 span span.article__title";
        cy.get(item).click();
        cy.wait(1000);
        cy.get(header).then((title) => {
            assert.equal(title.text(), "Getting started");
        });
    });

    //@P2
    it("checks article after TOC wo article click", () => {
        var header = "h1 span span.article__title";
        var item = "ul[data-test='toc'] li[data-toc-scroll='d10e258']";
        assert.isFalse(isArticleChanged(header, item));
    });

    //@P3
    it('checks article after expander click', () => {
        var header = "h1 span span.article__title";
        var expander = "ul[data-test='toc'] li[data-toc-scroll='Getting_started'] a svg";
        assert.isFalse(isArticleChanged(header, expander));
        assert.isFalse(isArticleChanged(header, expander));
    });


    /* children tests */


    /**
     * @P1
     * At the moment test compares only the number of expanded children
     * but it is more correct to compare titles of expanded children as well
     * TODO: compare children titles
     */
    it('shows children after TOC item click', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started']";
        verifyChildrenNumber(item, 9, () => {
            cy.get(item).click()
        });
        //+expected: children titles correspond some document from which TOC is generated
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
        var item = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started']";
        verifyChildrenNumber(item, 0, () =>{
            cy.get(item).click().click();
        });
    });


    /**
     * @P2
     * At the moment test compares only the number of expanded children
     * but it is more correct to compare titles of expanded children as well
     * TODO: compare children titles
     */
    it('shows children after expander click', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started']";
        verifyChildrenNumber(item, 9, () => {
            cy.get(item).children("a").children("svg").click();
        });
    });

    //@P2
    it('hides children after expander click', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started']";
        verifyChildrenNumber(item,0, () => {
            cy.get(item).children("a").children("svg").click().click();
        });
    });

    //@P3
    it('shows children after TOC item wo article click', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll = 'd10e258']";
        verifyChildrenNumber(item, 12, () =>{
            cy.get(item).click();
        });
    });

    //@P3
    it('hides children after TOC item wo article click', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll = 'd10e258']"
        verifyChildrenNumber(item, 0, () => {
            cy.get(item).click().click();
        });
    });


    /* font tests */

    //@P2
    it('checks font of non-selected TOC item', () => {
        var link = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started'] a";
        verifyClass(link, "toc-item");
        verifyFont(link,"400");
    });

    //@P2
    it('checks font of selected TOC item with article', () => {
        var link = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started'] a";
        cy.get(link).click();
        verifyClass(link, "toc-item toc-item--selected" );
        verifyFont(link,"700" );
    });

    //@P3
    it('checks font of TOC item wo article after click', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll = 'd10e258'] a";
        cy.get(item).click();
        verifyClass(item,"toc-item" );
        verifyFont(item, "400" );
    });

     //@P3
    it('checks font of TOC item after expander click', () => {
        var link = "ul[data-test='toc'] li[data-toc-scroll = 'Getting_started'] a";
        for (var i = 0; i < 2; i++) {
            cy.get(link).children("svg").click();
            verifyClass(link, "toc-item");
            verifyFont(link, "400");
        }


    });

    /* hover tests */

    //@P3
    /* Should be checked manually
     * Looks like there are problems with hover in cypress
     */
    it('checks hover', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: put the mouse over any element in TOC
        //expected: grey hover is displayed over the element
    });

    /* expander icon tests */

    //@P3
    it('opens expander after expander click', () => {
        var expander = "ul[data-test='toc'] li[data-toc-scroll='Getting_started'] a svg";
        cy.get(expander).click();
        verifyClass(expander, "wt-icon wt-icon_size_xs toc-icon toc-icon--opened");
    });


    //@P3
    it('closes expander after expander click', () => {
        var expander = "ul[data-test='toc'] li[data-toc-scroll='Getting_started'] a svg";
        cy.get(expander).click().click();
        verifyClass(expander, "wt-icon wt-icon_size_xs toc-icon");
    });


    //@P2
    it('opens expander after TOC item click', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll='Getting_started']";
        var expander = item + " a svg";
        cy.get(item).click();
        verifyClass(expander, "wt-icon wt-icon_size_xs toc-icon toc-icon--opened");
    });

    //@P2
    it('closes expander after TOC item click', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll='Getting_started']";
        var expander = item + " a svg";
        cy.get(item).click().click();
        verifyClass(expander, "wt-icon wt-icon_size_xs toc-icon");
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
    it('checks first level indent', () => {
        //closes elements of the second level which are opened automatically
        cy.get("ul[data-test='toc'] li[data-toc-scroll = 'Installation_guide'] a svg").click();
        cy.get("ul[data-test='toc'] li[data-toc-scroll] a")
            .then((ms) =>{
                for (let i=0; i<ms.length; i++){
                    verifyIndent(1, () => {
                        return cy.wrap(ms.eq(i));
                    });
                }
            });
    });

    //@P3
    //TODO: check indent of all children
    it('checks second level indent', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll='Getting_started']";
        verifyIndent(2, () => {
            return cy.get(item).click().next().children("a");
        })
    });

    //@P3
    //TODO: check indent of all children
    it('checks third level indent', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll='Configuring_Project_and_IDE_Settings']";
        verifyIndent(3, () => {
            return cy.get(item).click().next().click().next().children("a");
        });
    });

    //@P3
    //TODO: check indent of all children
    it('checks fourth level indent', () => {
        var item = "ul[data-test='toc'] li[data-toc-scroll='Configuring_Project_and_IDE_Settings']";
        verifyIndent(4, () => {
            return cy.get(item).click().next().click().next().click().next().children("a")
        });
    });

    //@P3
    //TODO: check indent of all children
    it('checks fifth level indent', () => {
        //precondition: https://www.jetbrains.com/help/idea/installation-guide.html is opened
        //step1: Expand Non-JVM Technologies -> PHP -> Debug PHP applications
        // -> Configure a debugging engine -> Configure Xdebug
        //expected: check that left indent = 80px
    });

    /* functions */

    /**
     * Change of article is verified by absence of the same text on the page
     * @param thisSelector - selector of element which should be checked for presence
     * @param otherSelector - selector of element which should be clicked
     * @returns {boolean} - returns false if the same text is present on the page
     */
    function isArticleChanged(thisSelector, otherSelector) {
        var result = false;
        cy.get(thisSelector).then((title) => {
            var before = title.text();
            cy.get(otherSelector).click();
            cy.get(thisSelector).then((title) => {
                var after = title.text();
                result = !(before === after);
            });
        });
        return result;
    }

    /**
     * The number of expanded children is calculated and compared to childrenNumber param
     * @param parentSelector - selector of the parent item in TOC
     * @param childrenNumber - the number of children of parent item in TOC
     * @param action - action (e.g. click)
     */

    function verifyChildrenNumber(parentSelector, childrenNumber, action) {
        cy.get(parentSelector).next().then((nextParent) => {
            action();
            cy.get(parentSelector).nextUntil(nextParent)
                .should('have.length', childrenNumber);
        });
    }

    /**
     * Font weight of the element is verified
     * @param selector - css selector of element in DOM for which the font is verified
     * @param fontWeight - font-weight of element in DOM
     */
    function verifyFont(selector, fontWeight) {
        cy
            .get(selector)
            .should('have.css', 'font-weight')
            .and('eq', fontWeight);
    }

    /**
     * Class name of the element in DOM is verified
     * @param selector - element css selector in DOM
     * @param className - class name of element in DOM
     */
    function verifyClass(selector, className) {
        cy
            .get(selector)
            .should("have.class", className);
    }

    /**
     *
     * @param level - level in TOC
     * @param action - action to proceed to level
     */
    function verifyIndent(level, action) {
        action()
            .should('have.attr', "style")
            .and("eq", "padding-left: "+level*16 +"px;");
    }
});