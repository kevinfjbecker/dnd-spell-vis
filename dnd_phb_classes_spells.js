var d3_script = document.createElement('script');
d3_script.src = 'https://d3js.org/d3.v5.min.js';
d3_script.onload = () => { processPageData(); };
document.body.appendChild(d3_script);

// src: https://gist.github.com/stinoga/a9247841aedbd8f4f34e
(function (console) {

    console.save = function (data, filename) {

        if (!data) {
            console.error('Console.save: No data');
            return;
        }

        if (!filename) { filename = 'console.json'; }

        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4);
        }

        var blob = new Blob([data], { type: 'text/json' }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    };
})(console);

const generateCastingClassesSpells = () => {
    sections = d3.selectAll('.compendium-hr');
    spell_lists = d3.selectAll('.compendium-spell-lists');
    lists_spells = spell_lists.selectAll('p');

    castingClasses = sections.nodes()
        .map(n => n.innerText)
        .slice(0, 8)
        .map(s => s.split(' ')[0]);

    castingClassesSpells = lists_spells._groups.map((g, i) => {
        var currentLevel = -1,
            caster = {
                name: castingClasses[i],
                spells: []
            };

        g.forEach(n => {
            if (n.className === "List-Styles_List-Heading") {
                caster.spells[++currentLevel] = {
                    level: n.innerText,
                    spells: []
                };
            } else {
                caster.spells[currentLevel].spells.push(n.innerText);
            }
        });

        return caster;
    });
    return castingClassesSpells;
};

const generateAllSpells = (classesSpells) => {
    return [... new Set(  // no duplicates
        [].concat.apply( // spells from all of the casting classes
            [], classesSpells.map( // unwrap { name, spells }
                ccs => [].concat.apply( // spells from all levels of a class
                    [], ccs.spells.map(s => s.spells) // unwrap { level, spells }
                )
            )
        )
    )].sort(); // alphabetical order
};

const processPageData = () => {
    castingClassesSpells = generateCastingClassesSpells();
    spellsList = generateAllSpells(castingClassesSpells);
    console.log('Data "castingClassesSpells" and "spellsList" are ready.');
};