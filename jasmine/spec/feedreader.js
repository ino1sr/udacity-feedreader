/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

var runTests = function() {
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("have valid URLs", function() {
            expect(allFeeds).toBeDefined();
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                /* NOTE: I found some URL matching regex online
                 * but I read the RFC is complicated and even seasoned
                 * programmers are using wrong regex
                 * so I didn't copy the use regex I found
                 * and I am just checking for http/https
                 */
                expect(feed.url).toMatch(/https?:\/\/.+/);
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("have valid names", function() {
            expect(allFeeds).toBeDefined();
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            });
        });
    });

    describe("The menu", function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it("should be initially hidden", function() {
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
        });

        var menuIcon = $(".menu-icon-link");


        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it("should change menu visibility on click", function() {
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
            menuIcon.trigger( "click" );
            expect($("body").hasClass("menu-hidden")).toBeFalsy();
            menuIcon.trigger( "click" );
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
        });
    });

    describe("Initial Entries", function() {
        beforeEach(function(done) {
            spyOn(window, "loadFeed").and.callThrough();
            loadFeed(0, done);
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it("should have at least one entry", function(done) {
            expect(window.loadFeed).toHaveBeenCalled();
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        });
    });

    describe("New feed selection", function() {
        var previousContent = {};

        /* Serialize the titles for comparison */
        var getContent = function() {
            return {
                pageTitle: $(".header-title").html(),
                entryTitles: $(".feed .entry h2").map(function (idx, e) {
                    return $(e).html();
                }).get()
            };
        };

        beforeEach(function(done) {
            spyOn(window, "loadFeed").and.callThrough();

            var loadAgain = function() {
                /* Read current value (feed 0) */
                previousContent = getContent();
                /* Load again a different feed */
                loadFeed(1, done);
            };

            /* Ensure the initial feed is loaded */
            loadFeed(0, loadAgain);
        });

        it("should change content on new feed load", function(done) {
            expect(window.loadFeed.calls.count()).toEqual(2);
            var newContent = getContent();
            expect(newContent.pageTitle).not.toEqual(previousContent.pageTitle);
            expect(newContent.entryTitles).not.toEqual(previousContent.entryTitles);
            done();
        });
    });
}();

/* Ensure our test are run when google api is loaded */
google.setOnLoadCallback(runTests);
