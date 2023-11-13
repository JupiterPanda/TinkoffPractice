const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });

        it ('вставка некорректных пар - возвращает undefined', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.set(null, null), undefined);
            assert.strictEqual(dic.set(undefined, undefined), undefined);
            assert.strictEqual(dic.set(undefined, null), undefined);
            assert.strictEqual(dic.set(null, undefined), undefined);
            assert.strictEqual(dic.set("red", undefined), undefined);
            assert.strictEqual(dic.set(undefined, "red"), undefined);
            assert.strictEqual(dic.set("red", null), undefined);
            assert.strictEqual(dic.set(null, "red"), undefined);
            assert.strictEqual(dic.set([1, 2], "red"), undefined);
            assert.strictEqual(dic.set([1, 2], [1, 2]), undefined);
        });
        const dic = new core.Dictionary();
        it ('вставка корректных пар', () => {
            assert.strictEqual(dic.set('fruit', 'apple'), true);
            assert.strictEqual(dic.set('apple', 'green'), true);
        });
        it ('получение по существующему ключу', () => {
            assert.strictEqual(dic.get('fruit'), 'apple');
            assert.strictEqual(dic.get('apple'), 'green');
        });
        it ('получение по несуществующему ключу', () => {
            assert.strictEqual(dic.get('car'), undefined);
            assert.strictEqual(dic.get('red'), undefined);
        });
    });
});