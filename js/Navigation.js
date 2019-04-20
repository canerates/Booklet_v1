var page = {
    currentItem: { vert: 0, horz: 0 },  //vertical & horizontal
    activeHandler: "",
    defaultMainMenuLength: 6, //getting exact number in mainMenu.Load() (adding due to exception of Medion)
    defaultSubMenuLength: 6, //must be as many as "subMenu item divs in index.html" 
    mainMenuLength: 0,
    subMenuLength: 0, 
    categoryMainLength: 0, //from categories..
    categorySubLength: 0, //from categories..
    mainMenuMoveToSubMenu: true,
    subMenuMoveToCategoryMenu: true,
    categoryMenuMoveToTextMenu: false,
    languageList: ["eng", "tur", "ita", "ger", "fre", "spa", "dut"],
    language: ""

};

var scrollCat = {
    isContentEmpty: true,
    isContentSingle: false,
    lineHeight: 0,
    contentHeight: 0,
    contentItemLength: 0,
    visibleItemLength: 0,
    scrollingThreshold: 0,
    scrollStep: 0,
    scrollingIndex: 0,
    scrollingTime: 0,

    scrollDivHeight: 0,
    scrollBarHeight: 0,
    scrollBarNewMargin: 0
};

var scrollText = {
    lineHeight: 0,
    contentHeight: 0,
    selectedTextHeight: 0,
    scrollingTime: 0,
    scrollingIndex: 0,
    innerContentTopMargin: 0,

    scrollDivHeight: 0,
    scrollBarHeight: 0,
    scrollBarNewMargin: 0
};

var StartMenu = function () {
    mainMenu.Activate();
    mainMenu.Load();
    mainMenu.Select();
    mainMenu.ActivateScrolling();
    document.onkeydown = keyEventListener;
    $('body').css('opacity', 1);
}

var keyEventListener = function (evt) {
    var evtobj = evt ? evt : window.event;
    var unicode = evtobj.keyCode ? evtobj.keyCode : evtobj.which;

    if (page.activeHandler(unicode)) {
        evt.preventDefault();

    }
};

window.onload = StartMenu;

var mainMenu = {
    Handler: function (key) {
        switch (key) {
            case KEYS.UP:
                if (page.currentItem.vert > 0) {
                    mainMenu.Deselect();
                    mainMenu.DeactivateScrolling();
                    page.currentItem.vert = page.currentItem.vert - 1;
                    mainMenu.Select();
                    mainMenu.ActivateScrolling();
                }
                else {
                    mainMenu.DeactivateScrolling();
                    mainMenu.Deselect();
                    page.currentItem.vert = page.mainMenuLength - 1;
                    mainMenu.Select();
                    mainMenu.ActivateScrolling();
                }
                break;
            case KEYS.DOWN:
                if (page.currentItem.vert < page.mainMenuLength - 1) {
                    mainMenu.Deselect();
                    mainMenu.DeactivateScrolling();
                    page.currentItem.vert = page.currentItem.vert + 1;
                    mainMenu.Select();
                    mainMenu.ActivateScrolling();
                }
                else {
                    mainMenu.DeactivateScrolling();
                    mainMenu.Deselect();
                    page.currentItem.vert = 0;
                    mainMenu.Select();
                    mainMenu.ActivateScrolling();
                }
                break;
            case KEYS.LEFT:

                break;
            case KEYS.RIGHT:
                mainMenu.Deactivate();
                mainMenu.DeactivateScrolling();
                page.currentItem.horz = page.currentItem.horz + 1;
                subMenu.Activate();
                subMenu.Load();
                subMenu.Select();
                subMenu.ActivateScrolling();
                break;
            case KEYS.OK:
                mainMenu.Deactivate();
                mainMenu.DeactivateScrolling();
                page.currentItem.horz = page.currentItem.horz + 1;
                subMenu.Activate();
                subMenu.Load();
                subMenu.Select();
                subMenu.ActivateScrolling();
                break;

            default: break;
        }
    },
    Activate: function () {
        $('#mainMenu').css('width', '424px');
        $('#mainMenu').css('background-image', 'url(resources/theme/IB_bg1.png)');
        $('#mainMenu').css('margin-left', '0px');
        $('#eibTitle').css('margin-left', '0px');
        page.currentItem.vert = mainMenu.selectedItemIndex;
        page.categoryMainLength = categories.categoryItems.length;
        page.activeHandler = mainMenu.Handler;
    },

    Deactivate: function () {
        mainMenu.selectedItemIndex = page.currentItem.vert;
        subMenu.selectedItemIndex = 0;
    },

    Select: function () {
        $('#itemicon_' + page.currentItem.vert + '' + page.currentItem.horz).attr('class', 'mainMenuItemIconActive');
        $('#itemtext_' + page.currentItem.vert + '' + page.currentItem.horz).attr('class', 'mainMenuItemTextActive');
        $('#itemiconimg_' + page.currentItem.vert + '' + page.currentItem.horz).attr('src', 'resources/theme/IB_icon1_' + page.currentItem.vert + '_on.png');
    },
    Deselect: function () {
        $('#itemicon_' + page.currentItem.vert + '' + page.currentItem.horz).attr('class', 'mainMenuItemIcon');
        $('#itemtext_' + page.currentItem.vert + '' + page.currentItem.horz).attr('class', 'mainMenuItemText');
        $('#itemiconimg_' + page.currentItem.vert + '' + page.currentItem.horz).attr('src', 'resources/theme/IB_icon1_' + page.currentItem.vert + '_off.png');
    },

    Load: function () {
        $('#eibTitleText').html(categories.menuTitle);
        page.defaultMainMenuLength = $('.mainMenuItem').length;
        page.mainMenuLength = page.defaultMainMenuLength;

        if (page.categoryMainLength < page.defaultMainMenuLength) {
            page.mainMenuLength = page.categoryMainLength;
            for (var i = 0; i < page.mainMenuLength; i++) {
                $('#itemscrollingtext_' + i + '0').html(categories.categoryItems[i].title);
            }
        }
        else {
            for (var i = 0; i < page.defaultMainMenuLength; i++) {
                $('#itemscrollingtext_' + i + '0').html(categories.categoryItems[i].title);
            }
        }

    },

    ActivateScrolling: function () {
        var mainHeadDiv = $('.mainMenuTextInnerDiv')[page.currentItem.vert];
        var mainScrollingDiv = $('#itemscrollingtext_' + page.currentItem.vert + '' + page.currentItem.horz)
        var width = mainScrollingDiv.width();
        var n = mainHeadDiv.clientWidth;
        if (width > n) {
            var i = 20;
            mainMenu.interval = setInterval(function () {
                mainScrollingDiv.css('left', i + 'px');
                i--;
                if (-i > width - n + 50) {
                    i = 25;
                }
            }, 20);
        }

    },

    DeactivateScrolling: function () {
        $('#itemscrollingtext_' + page.currentItem.vert + '' + page.currentItem.horz).css('left', '0px');
        clearInterval(mainMenu.interval);
    },

    interval: null,
    selectedItemIndex: 0

};


var subMenu = {
    Handler: function (key) {
        switch (key) {
            case KEYS.UP:
                if (page.currentItem.vert > 0) { // 1st state: regular up
                    subMenu.Deselect();
                    subMenu.DeactivateScrolling();
                    page.currentItem.vert = page.currentItem.vert - 1;
                    subMenu.Select();
                    subMenu.ActivateScrolling();
                }
                else if (subMenu.topMenuIndex != 0) { // 2nd state: up with paging one by one
                    subMenu.DeactivateScrolling();
                    subMenu.topMenuIndex = subMenu.topMenuIndex - 1;
                    subMenu.Load();
                    subMenu.HideUpArrow();
                    subMenu.ShowArrows();
                    subMenu.ActivateScrolling();
                }
                else if (page.subMenuLength < page.categorySubLength) {  // 3rd state: first to last with paging  (page.currentItem.vert == 0 && subMenu.topMenuIndex == 0)
                    subMenu.DeactivateScrolling();
                    subMenu.topMenuIndex = page.categorySubLength - page.subMenuLength;
                    subMenu.Load();
                    subMenu.Deselect();
                    page.currentItem.vert = page.subMenuLength - 1;
                    subMenu.Select();
                    subMenu.HideDownArrow();
                    subMenu.ShowArrows();
                    subMenu.ActivateScrolling();
                }
                else if (page.categorySubLength <= page.subMenuLength) { // 4th state: first to last without paging
                    subMenu.DeactivateScrolling();
                    subMenu.Deselect();
                    page.currentItem.vert = page.categorySubLength - 1;
                    subMenu.Select();
                    subMenu.ActivateScrolling();
                }
                break;
            case KEYS.DOWN:
                if (page.currentItem.vert < page.subMenuLength - 1) { // 1st state: regular down
                    subMenu.Deselect();
                    subMenu.DeactivateScrolling();
                    page.currentItem.vert = page.currentItem.vert + 1;
                    subMenu.Select();
                    subMenu.ActivateScrolling();
                }
                else if (page.subMenuLength + subMenu.topMenuIndex < page.categorySubLength) { // 2nd state: down with paging one by one
                    subMenu.DeactivateScrolling();
                    subMenu.topMenuIndex = subMenu.topMenuIndex + 1;
                    subMenu.Load();
                    subMenu.HideDownArrow();
                    subMenu.ShowArrows();
                    subMenu.ActivateScrolling();
                }
                else if (page.subMenuLength < page.categorySubLength) { // 3rd state: last to first with paging  (page.currentItem.vert == page.subMenuLength -1 && page.subMenuLength + subMenu.topMenuIndex == page.categorySubLength)
                    subMenu.DeactivateScrolling();
                    subMenu.topMenuIndex = 0;
                    subMenu.Load();
                    subMenu.Deselect();
                    page.currentItem.vert = 0;
                    subMenu.Select();
                    subMenu.HideUpArrow();
                    subMenu.ShowArrows();
                    subMenu.ActivateScrolling();
                }
                else if (page.categorySubLength <= page.subMenuLength) { //4th state: last to first without paging
                    subMenu.DeactivateScrolling();
                    subMenu.Deselect();
                    page.currentItem.vert = 0;
                    subMenu.Select();
                    subMenu.ActivateScrolling();
                }

                break;
            case KEYS.LEFT:
                page.subMenuMoveToCategoryMenu = false;
                subMenu.Deactivate();
                subMenu.DeactivateScrolling();
                page.currentItem.horz = page.currentItem.horz - 1;
                mainMenu.Activate();
                mainMenu.ActivateScrolling();

                break;
            case KEYS.RIGHT:
                page.subMenuMoveToCategoryMenu = true;
                subMenu.Deactivate();
                subMenu.DeactivateScrolling();
                page.currentItem.horz = page.currentItem.horz + 1;
                contentCategoryMenu.Activate();
                page.subMenuMoveToCategoryMenu = false;
                break;

            case KEYS.OK:
                page.subMenuMoveToCategoryMenu = true;
                subMenu.Deactivate();
                subMenu.DeactivateScrolling();
                page.currentItem.horz = page.currentItem.horz + 1;
                contentCategoryMenu.Activate();
                page.subMenuMoveToCategoryMenu = false;
                break;


            default: break;
        }
    },

    Activate: function () {
        $('#mainMenu').css('width', '742px');
        $('#mainMenu').css('background-image', 'url(resources/theme/IB_bg2.png)');
        $('#mainMenu').css('margin-left', '-210px');
        $('#eibTitle').css('margin-left', '-210px');
        $('#subMenu').css('margin-left', '0px');
        $('#subMenu').css('opacity', '1');
        page.currentItem.vert = subMenu.selectedItemIndex;
        page.categorySubLength = categories.categoryItems[mainMenu.selectedItemIndex].Items.length;
        page.activeHandler = subMenu.Handler;

    },

    Deactivate: function () {

        subMenu.selectedItemIndex = page.currentItem.vert;
        if (!page.subMenuMoveToCategoryMenu) {
            $('#subMenu').css('opacity', '0');
            subMenu.Deselect();
            subMenu.topMenuIndex = 0;
        }
        subMenu.HideArrows();

    },

    Select: function () {
        $('#itemtext_' + page.currentItem.vert + '' + page.currentItem.horz).attr('class', 'subMenuItemTextActive');

    },

    Deselect: function () {
        $('#itemtext_' + page.currentItem.vert + '' + page.currentItem.horz).attr('class', 'subMenuItemText');

    },

    Load: function () {

        for (var i = 0; i < page.defaultSubMenuLength; i++) {
            $('#itemscrollingtext_' + i + '1').html("");
        }

        page.subMenuLength = page.defaultSubMenuLength;
        if (page.categorySubLength < page.defaultSubMenuLength) {
            page.subMenuLength = page.categorySubLength;
            for (var i = 0; i < page.subMenuLength; i++) {
                $('#itemscrollingtext_' + i + '1').html(categories.categoryItems[mainMenu.selectedItemIndex].Items[i + subMenu.topMenuIndex].title);
            }
        }
        else {
            for (var i = 0; i < page.defaultSubMenuLength; i++) {
                $('#itemscrollingtext_' + i + '1').html(categories.categoryItems[mainMenu.selectedItemIndex].Items[i + subMenu.topMenuIndex].title);
            }
            subMenu.ShowArrows();
        }

    },
    ShowArrows: function () {
        if (subMenu.topMenuIndex != 0) {
            $('#upArrow').css('opacity', 1);
        }

        if (page.subMenuLength + subMenu.topMenuIndex < page.categorySubLength) {
            $('#downArrow').css('opacity', 1);
        }
    },

    HideUpArrow: function () {
        if (subMenu.topMenuIndex == 0) {
            $('#upArrow').css('opacity', 0);
        }
    },

    HideDownArrow: function () {
        if (page.subMenuLength + subMenu.topMenuIndex + 1 > page.categorySubLength) {
            $('#downArrow').css('opacity', 0);
        }
    },

    HideArrows: function () {
        $('.arrows').css('opacity', 0);
    },

    ActivateScrolling: function () {
        var subHeadDiv = $('.subMenuTextInnerDiv')[subMenu.selectedItemIndex];
        var subScrollingDiv = $('#itemscrollingtext_' + page.currentItem.vert + '' + page.currentItem.horz); ;
        var width = subScrollingDiv.width();
        var n = subHeadDiv.clientWidth;
        if (width > n) {
            var i = 20;
            subMenu.interval = setInterval(function () {
                subScrollingDiv.css('left', i + 'px');
                i--;
                if (-i > width - n + 50) {
                    i = 25;
                }
            }, 20);
        }

    },

    DeactivateScrolling: function () {
        $('#itemscrollingtext_' + page.currentItem.vert + '' + page.currentItem.horz).css('left', '0px');
        clearInterval(subMenu.interval);
    },

    interval: null,
    selectedItemIndex: 0,
    topMenuIndex: 0
};


var contentCategoryMenu = {
    Handler: function (key) {
        switch (key) {
            case KEYS.UP:
                contentCategoryMenu.GoUp();
                break;
            case KEYS.DOWN:
                contentCategoryMenu.GoDown();
                break;
            case KEYS.LEFT:
                contentCategoryMenu.GoLeft();
                break;
            case KEYS.RIGHT:
                contentCategoryMenu.GoRight();
                break;
            case KEYS.OK:
                if (!(scrollCat.isContentEmpty)) {
                    page.categoryMenuMoveToTextMenu = true;
                    contentCategoryMenu.Deactivate();
                    contentTextMenu.Activate();
                    page.categoryMenuMoveToTextMenu = false;
                }
                break;
            default: break;
        }
    },

    Activate: function () {
        if (page.subMenuMoveToCategoryMenu) {
            $('#mainMenu').css('width', '1081px');
            $('#mainMenu').css('background-image', 'url(resources/theme/IB_bg5.png)');
            $('#mainMenu').css('margin-left', '-330px');
            $('#eibTitle').css('margin-left', '-330px');
            $('#subMenu').css('margin-left', '-407px');
            $('#contentMenu').css('opacity', 1);
            contentCategoryMenu.selectedItemIndex = 0;
            contentCategoryMenu.Load();




        }
        else {

            for (var i = contentCategoryMenu.selectedItemIndex + 1; i < contentCategoryMenu.itemLength; i++) {
                document.getElementsByClassName('contentHead')[i].style.opacity = 1;
            }
            document.getElementsByClassName('contentBody')[contentCategoryMenu.selectedItemIndex].style.opacity = 0;
            if (contentCategoryMenu.selectedItemIndex < contentCategoryMenu.itemLength - 1) {
                document.getElementsByClassName('contentHead')[contentCategoryMenu.selectedItemIndex + 1].style.marginTop = parseInt(document.getElementsByClassName('contentHead')[contentCategoryMenu.selectedItemIndex + 1].style.marginTop, 10) - document.getElementsByClassName('contentBody')[contentCategoryMenu.selectedItemIndex].offsetHeight + "px";
            }
            document.getElementsByClassName('contentHead')[0].style.marginTop = "0px";
            //            document.getElementsByClassName('contentHead')[0].style.marginTop = parseInt(document.getElementsByClassName('contentHead')[0].style.marginTop, 10) + (contentCategoryMenu.selectedItemIndex * scrollCat.lineHeight) + "px";

            contentCategoryMenu.SetScroll(); //flagback
            page.activeHandler = contentCategoryMenu.Handler;
        }

    },

    Deactivate: function () {
        if (!page.categoryMenuMoveToTextMenu) {
            $('#contentMenu').css('opacity', 0);
            scrollCat.scrollStep = 0;
            scrollCat.scrollingIndex = 0;
            subMenu.ShowArrows();
        }
        
    },

    Load: function () {
        $('#innerContent').css('margin-top', '0px');

        if (location.protocol == 'file:') {
            var content = categories.categoryItems[mainMenu.selectedItemIndex].Items[subMenu.selectedItemIndex + subMenu.topMenuIndex].content;
            $('#innerContent').html(content);
            contentCategoryMenu.AfterLoad();
        } else {
            var filename = categories.categoryItems[mainMenu.selectedItemIndex].Items[subMenu.selectedItemIndex + subMenu.topMenuIndex].file;
            var params = {};
            params['file'] = filename;

            $.post("/editor/getcontent.php",
                params,
                function (data, status) {
                    $('#innerContent').html(data);
                    contentCategoryMenu.AfterLoad();
                }
          );
        }



    },

    AfterLoad: function () {

        contentCategoryMenu.itemLength = $('.contentBody').length;
        if (contentCategoryMenu.itemLength != 0) {
            document.getElementsByClassName('contentHead')[0].style.marginTop = "0px";
            for (var i = 0; i < contentCategoryMenu.itemLength - 1; i++) {
                document.getElementsByClassName('contentHead')[i + 1].style.marginTop = '-' + $('.contentBody')[i].offsetHeight + 'px';

            }
            contentCategoryMenu.Select();
            scrollCat.isContentEmpty = false;
        } else {
            scrollCat.isContentEmpty = true;
        }

        if (contentCategoryMenu.itemLength != 0 && contentCategoryMenu.itemLength == 1) {
            scrollCat.isContentSingle = true;
            page.categoryMenuMoveToTextMenu = true;
            contentCategoryMenu.Deactivate();
            contentTextMenu.Activate();
            page.categoryMenuMoveToTextMenu = false;
        } else {
            $('.contentBody').css('opacity', 0);
            scrollCat.isContentSingle = false;
            contentCategoryMenu.SetScroll();
            page.activeHandler = contentCategoryMenu.Handler;
        }

    },

    Select: function () {
        try {
            document.getElementsByClassName('contentHead')[contentCategoryMenu.selectedItemIndex].classList.add('contentHeadActive');
            contentCategoryMenu.ActivateScrolling();
        }
        catch (ex) {
        }
    },

    Deselect: function () {
        try {
            document.getElementsByClassName('contentHead')[contentCategoryMenu.selectedItemIndex].classList.remove('contentHeadActive');
            contentCategoryMenu.DeactivateScrolling();
        }
        catch (ex) {
        }
    },

    GoDown: function () {
        if (contentCategoryMenu.selectedItemIndex < contentCategoryMenu.itemLength - 1) {
            if (scrollCat.contentItemLength > scrollCat.visibleItemLength && contentCategoryMenu.selectedItemIndex + 1 == scrollCat.scrollStep + scrollCat.scrollingThreshold && scrollCat.scrollingIndex < scrollCat.scrollingTime) {
                scrollCat.scrollStep += scrollCat.scrollingThreshold;
                var newMargin = '-' + scrollCat.lineHeight * scrollCat.scrollStep + 'px';
                $('#innerContent').css('margin-top', newMargin);
                scrollCat.scrollingIndex++;

                if (scrollCat.scrollingIndex == scrollCat.scrollingTime) {
                    scrollCat.scrollBarNewMargin = scrollCat.scrollDivHeight - scrollCat.scrollBarHeight + 'px';
                } else {
                    scrollCat.scrollBarNewMargin = scrollCat.scrollingIndex * scrollCat.scrollBarHeight + 'px';
                }
                $('#scrollBar').css('margin-top', scrollCat.scrollBarNewMargin);


            }
            contentCategoryMenu.Deselect();
            contentCategoryMenu.selectedItemIndex++;
            contentCategoryMenu.Select();
        }
    },

    GoUp: function () {
        if (contentCategoryMenu.selectedItemIndex > 0) {
            if (scrollCat.contentItemLength > scrollCat.visibleItemLength && contentCategoryMenu.selectedItemIndex == scrollCat.scrollStep && scrollCat.scrollingIndex > 0) {
                scrollCat.scrollStep -= scrollCat.scrollingThreshold;
                var newMargin = '-' + scrollCat.lineHeight * scrollCat.scrollStep + 'px';
                $('#innerContent').css('margin-top', newMargin);
                scrollCat.scrollingIndex--;

                if (scrollCat.scrollingIndex == 0) {
                    scrollCat.scrollBarNewMargin = '0px';
                } else {
                    scrollCat.scrollBarNewMargin = scrollCat.scrollingIndex * scrollCat.scrollBarHeight + 'px';
                }

                $('#scrollBar').css('margin-top', scrollCat.scrollBarNewMargin);
            }
            contentCategoryMenu.Deselect();
            contentCategoryMenu.selectedItemIndex--;
            contentCategoryMenu.Select();
        }

    },

    GoLeft: function () {
        page.categoryMenuMoveToTextMenu = false;
        contentCategoryMenu.Deactivate();
        page.currentItem.horz = page.currentItem.horz - 1;
        subMenu.Activate();
        subMenu.ActivateScrolling();
    },

    GoRight: function () {
        if (!(scrollCat.isContentEmpty)) {
            page.categoryMenuMoveToTextMenu = true;
            contentCategoryMenu.Deactivate();
            contentTextMenu.Activate();
            page.categoryMenuMoveToTextMenu = false;
        }
    },

    SetScroll: function () {
        scrollCat.lineHeight = parseInt($('.contentHead').css('line-height'), 10);
        scrollCat.contentItemLength = $('.contentItem').length;
        scrollCat.contentHeight = parseInt($('#content').css('height'), 10);
        scrollCat.visibleItemLength = Math.floor(scrollCat.contentHeight / scrollCat.lineHeight);
        scrollCat.scrollingThreshold = Math.floor(scrollCat.visibleItemLength); //for moving items when you pass next window(constant)
        if (scrollCat.contentItemLength > scrollCat.visibleItemLength) {
            scrollCat.scrollingTime = Math.ceil(scrollCat.contentItemLength / (scrollCat.visibleItemLength)) - 1;
        } else {
            scrollCat.scrollingTime = 0;
        }

        scrollCat.scrollDivHeight = parseInt($('#scrollDiv').css('height'), 10);
        scrollCat.scrollBarHeight = scrollCat.scrollDivHeight / (scrollCat.scrollingTime + 1);
        $('#scrollBar').css('height', scrollCat.scrollBarHeight);

        scrollCat.scrollBarNewMargin = scrollCat.scrollingIndex * scrollCat.scrollBarHeight + 'px';
        $('#scrollBar').css('margin-top', scrollCat.scrollBarNewMargin);

    },

    ActivateScrolling: function () {
        var contentHeadDiv = $('.contentHead')[contentCategoryMenu.selectedItemIndex];
        var contentScrollingDiv = $('.contentHeadScrollingText')[contentCategoryMenu.selectedItemIndex];
        var width = contentScrollingDiv.clientWidth;
        var n = contentHeadDiv.clientWidth;
        if (width > n) {
            var i = 20;
            contentCategoryMenu.interval = setInterval(function () {
                contentScrollingDiv.style.left = i + "px";
                i--;
                if (-i > width - n + 50) {
                    i = 25;
                }
            }, 10);
        }

    },

    DeactivateScrolling: function () {
        $('.contentHeadScrollingText')[contentCategoryMenu.selectedItemIndex].style.left = "0px";
        clearInterval(contentCategoryMenu.interval);
    },

    interval: null,
    selectedItemIndex: 0,
    itemLength: 0

};

var contentTextMenu = {
    Handler: function (key) {
        switch (key) {
            case KEYS.UP:
                contentTextMenu.GoUp();
                break;
            case KEYS.DOWN:
                contentTextMenu.GoDown();
                break;
            case KEYS.LEFT:
                contentTextMenu.Deactivate();
                if (scrollCat.isContentSingle) {
                    contentCategoryMenu.GoLeft();
                }
                else {
                    contentCategoryMenu.Activate();
                }
                break;
            case KEYS.RIGHT:
                break;
            case KEYS.OK:
                contentTextMenu.Deactivate();
                if (scrollCat.isContentSingle) {
                    contentCategoryMenu.GoLeft();
                }
                else {
                    contentCategoryMenu.Activate();
                }
                break;
            default: break;
        }
    },

    Activate: function () {
        contentTextMenu.SetScroll(); //flagback
        document.getElementsByClassName('contentHead')[0].style.marginTop = parseInt(document.getElementsByClassName('contentHead')[0].style.marginTop, 10) - (contentCategoryMenu.selectedItemIndex * scrollText.lineHeight) + (scrollCat.lineHeight * scrollCat.visibleItemLength * scrollCat.scrollingIndex) + "px";

        if (contentCategoryMenu.selectedItemIndex < contentCategoryMenu.itemLength - 1) {
            document.getElementsByClassName('contentHead')[contentCategoryMenu.selectedItemIndex + 1].style.marginTop = parseInt(document.getElementsByClassName('contentHead')[contentCategoryMenu.selectedItemIndex + 1].style.marginTop, 10) + document.getElementsByClassName('contentBody')[contentCategoryMenu.selectedItemIndex].offsetHeight + "px";
        }
        document.getElementsByClassName('contentBody')[contentCategoryMenu.selectedItemIndex].style.opacity = 1;
        for (var i = contentCategoryMenu.selectedItemIndex + 1; i < contentCategoryMenu.itemLength; i++) {
            document.getElementsByClassName('contentHead')[i].style.opacity = 0;
        }


        contentTextMenu.selectedItemIndex = 0;
        page.activeHandler = contentTextMenu.Handler;

    },

    Deactivate: function () {
        var newMargin = '-' + scrollCat.lineHeight * scrollCat.visibleItemLength * scrollCat.scrollingIndex + 'px';
        $('#innerContent').css('margin-top', newMargin);
        scrollText.scrollingIndex = 0;
        scrollText.scrollingTime = 0;
    },

    GoDown: function () {
        if (scrollText.scrollingIndex < scrollText.scrollingTime) {
            scrollText.scrollingIndex++;
            var newMargin = (scrollText.scrollingIndex * scrollText.lineHeight) + (scrollCat.lineHeight * scrollCat.scrollStep) // scrollCat.lineHeight * scrollCat.scrollStep >>> for taking the 2nd page margin on category menu
            $('#innerContent').css('margin-top', '-' + newMargin + 'px');

            if (scrollText.scrollingIndex == scrollText.scrollingTime) {
                scrollText.scrollBarNewMargin = scrollText.scrollDivHeight - scrollText.scrollBarHeight + 'px';
            } else {
                scrollText.scrollBarNewMargin = scrollText.scrollingIndex * scrollText.scrollBarHeight + 'px';
            }
            $('#scrollBar').css('margin-top', scrollText.scrollBarNewMargin);
        }
    },

    GoUp: function () {
        if (scrollText.scrollingIndex > 0) {
            scrollText.scrollingIndex--;
            var newMargin = (scrollText.scrollingIndex * scrollText.lineHeight) + (scrollCat.lineHeight * scrollCat.scrollStep); // scrollCat.lineHeight * scrollCat.scrollStep >>> for taking the 2nd page margin on category menu
            $('#innerContent').css('margin-top', '-' + newMargin + 'px');
            if (scrollText.scrollingIndex == 0) {
                scrollText.scrollBarNewMargin = '0px';
            } else {
                scrollText.scrollBarNewMargin = scrollText.scrollingIndex * scrollText.scrollBarHeight + 'px';
            }

            $('#scrollBar').css('margin-top', scrollText.scrollBarNewMargin);

        }
    },

    SetScroll: function () {
        scrollText.lineHeight = parseInt($('.contentHead').css('line-height'), 10);
        scrollText.selectedTextHeight = document.getElementsByClassName('contentBody')[contentCategoryMenu.selectedItemIndex].offsetHeight + scrollText.lineHeight;
        scrollText.innerContentTopMargin = parseInt($('#innerContent').css('margin-top'));
        scrollText.contentHeight = parseInt($('#content').css('height'), 10);
        if (scrollText.selectedTextHeight >= scrollText.contentHeight) {
            scrollText.scrollingTime = Math.ceil((scrollText.selectedTextHeight - scrollText.contentHeight) / scrollText.lineHeight) + 1;
        }

        scrollText.scrollDivHeight = parseInt($('#scrollDiv').css('height'), 10);
        scrollText.scrollBarHeight = scrollText.scrollDivHeight / (scrollText.scrollingTime + 1);
        $('#scrollBar').css('height', scrollText.scrollBarHeight);

        scrollText.scrollBarNewMargin = scrollText.scrollingIndex * scrollText.scrollBarHeight + 'px';
        $('#scrollBar').css('margin-top', scrollText.scrollBarNewMargin);

    },

    selectedItemIndex: 0


};

var isLanguageValid = function (lang) {
    try {
        valid = validateLanguageList(lang);
    }
    catch (e)
    { valid = false; }
    return valid;
}

function validateLanguageList(txt) {
    txt = txt.toUpperCase();
    if (!txt) return false;
    while (txt) {
        if (txt.length < 3) {
            return false;
        }
        for (var i = 0; i < 3; i++) {
            var c = txt.charCodeAt(i);
            if (c < 0x41 || c > 0x5a) return false;
        }
        txt = txt.substring(3);
        if (txt.length > 0) {
            if (txt.substring(0, 1) != ',') return false;
            txt = txt.substring(1);
        }
    }
    return true;
}

var containsArray = function (a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj.toString()) {
            return true;
        }
    }
    return false;
};



