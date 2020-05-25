// data

const classesSpells = require('./classesSpells.json');

// set operations

const union = (a, b) => {
    let _union = new Set(a);
    for (let element of b) {
        _union.add(element);
    }
    return _union;
};

const intersection = (a, b) => {
    let _intersection = new Set();
    for (let element of b) {
        if (a.has(element)) {
            _intersection.add(element);
        }
    }
    return _intersection;
};

const difference = (a, b) => {
    let _difference = new Set(a);
    for (let element of b) {
        _difference.delete(element);
    }
    return _difference;
};

// util

const getAllSpellNames = (classesSpells) => [... new Set(
    [].concat.apply(
        [], classesSpells.map(
            ccs => [].concat.apply(
                [], ccs.spells.map(s => s.spells)
            )
        )
    )
)];

const getClassSpellNames = (casterClassName, classesSpells) => {
    casterClass = classesSpells.filter((cs) => cs.name === casterClassName)[0];
    return [].concat.apply([], casterClass.spells.map(s => s.spells));
};

// output

const casterClassNames = classesSpells.map(cs => cs.name);
const spellNames = getAllSpellNames(classesSpells);


// // Caster Spell Intersections
// for (let a_caster of casterClassNames) {
//     for (let b_caster of casterClassNames) {
//         if (a_caster !== b_caster) {
//             let a_spells = new Set(getClassSpellNames(a_caster, classesSpells));
//             let b_spells = new Set(getClassSpellNames(b_caster, classesSpells));
//             sharedSpells = intersection(a_spells, b_spells);
//             console.log(`${a_caster} and ${b_caster} share ${sharedSpells.size} spells.`);
//         }
//     }
// }

// Caster Unique Spells
for (let a_caster of casterClassNames) {
    let uniqueSpells = new Set(getClassSpellNames(a_caster, classesSpells));
    for (let b_caster of casterClassNames) {
        if (a_caster !== b_caster) {
            let b_spells = new Set(getClassSpellNames(b_caster, classesSpells));
            uniqueSpells = difference(uniqueSpells, b_spells);
        }
    }
    console.log(`${a_caster} has ${uniqueSpells.size} unique spells.`);
}

// // Classes sharing a spell
// let spellSharing = [];
// for (let spell of spellNames) {
//     let n = 0;
//     for (let caster of casterClassNames) {
//         let caster_spells = new Set(getClassSpellNames(caster, classesSpells));
//         if (caster_spells.has(spell)) {
//             n = n + 1;
//         }
//     }
//     spellSharing.push({ name: spell, sharedBy: n });
// }
// spellSharing.sort((a, b) => a.sharedBy - b.sharedBy);
// spellSharing.forEach(sharedSpell => {
//     let {name, sharedBy} = sharedSpell;
//     console.log(`${name} is shared by ${sharedBy} classes.`);
// });

// spell sharing counts
let spellSharing = [];
let minCount = Number.MAX_SAFE_INTEGER;
let maxCount = Number.MIN_SAFE_INTEGER;
for (let spell of spellNames) {
    let n = 0;
    for (let caster of casterClassNames) {
        let caster_spells = new Set(getClassSpellNames(caster, classesSpells));
        if (caster_spells.has(spell)) {
            n = n + 1;
        }
    }
    if (n < minCount) { minCount = n; }
    if (n > maxCount) { maxCount = n; }
    spellSharing.push({ name: spell, sharedBy: n });
}
let spellSharingCounts = [];
for(let i = 0; i <= maxCount; i++) {
    spellSharingCounts[i] = 0;
}
spellSharing.forEach(sharedSpell => {
    let { sharedBy } = sharedSpell;
    spellSharingCounts[sharedBy]++;
});
console.log('Spells Shared by Classes');
spellSharingCounts.forEach(c => {
    console.log(c);
});