// 4.1
document.body.textContent.trim().split('\n')
    .map(pair => {
       const [a, b] = pair
           .split(',')
           .map(range => {
               const [first, last] = range.split('-').map(Number);
               return { first, last };
           });

        return a.first >= b.first && a.last <= b.last ||
               a.first <= b.first && a.last >= b.last;
    })
    .filter(Boolean)
    .length;
// 471

// 4.2
document.body.textContent.trim().split('\n')
    .map(pair => {
       const [a, b] = pair
           .split(',')
           .map(range => {
               const [first, last] = range.split('-').map(Number);
               return { first, last };
           });

        return !(a.last < b.first || a.first > b.last);
    })
    .filter(Boolean)
    .length;
// 888
