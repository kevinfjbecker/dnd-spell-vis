var
    CASTINGTIME = 'CASTINGTIME',
    COMPONENTS = 'COMPONENTS',
    DAMAGE_EFFECT = 'DAMAGE_EFFECT',
    DETAILS = 'DETAILS',
    DURATION = 'DURATION',
    LEVEL_SCHOOL_RITUAL = 'LEVEL_SCHOOL_RITUAL',
    NAME = 'NAME',
    RANGE = 'RANGE';

var nextState = {
    NAME: LEVEL_SCHOOL_RITUAL,
    LEVEL_SCHOOL_RITUAL: CASTINGTIME,
    CASTINGTIME: RANGE,
    RANGE: COMPONENTS,
    COMPONENTS: DURATION,
    DURATION: DETAILS
};

var content = document.querySelector('.p-article-content');
var article_nodes = Array.prototype.slice.call(content.children);

var spellsDetails = [];
var state = null;
var spell_index = -1;
article_nodes.forEach(e => {
    if (e.tagName === 'H3') {
        spell_index = spell_index + 1;
        spellsDetails[spell_index] = {
            name: e.innerText
        };
        state = nextState.NAME;
    } else {
        switch (state) {
            case (LEVEL_SCHOOL_RITUAL):
                spellsDetails[spell_index].levelSchool = e.innerText;
                state = nextState.LEVEL_SCHOOL_RITUAL;
                break;
            case (CASTINGTIME):
                spellsDetails[spell_index].castingTime = e.innerText;
                state = nextState.CASTINGTIME;
                break;
            case (RANGE):
                spellsDetails[spell_index].range = e.innerText;
                state = nextState.RANGE;
                break;
            case (COMPONENTS):
                spellsDetails[spell_index].components = e.innerText;
                state = nextState.COMPONENTS;
                break;
            case (DURATION):
                spellsDetails[spell_index].duration = e.innerText;
                state = nextState.DURATION;
                break;
            case (DETAILS):
                if (spellsDetails[spell_index].details === undefined) {
                    spellsDetails[spell_index].details = [];
                }
                if (e.tagName === 'P' || e.tagName === 'UL') {
                    spellsDetails[spell_index].details.push(e.innerText);
                } else {
                    console.log(`Unprocessed tag: ${e.tagName}`);
                    console.log(e);
                }
                break;
            default:
                // console.log(`state: ${state}`); // debug
                // console.log(e.tagName); // debug
                // console.log(e); // debug
                break;
        }

    }
});