const levels = [
  {
    level: "1",
    levelTitle: "Select elements by their type",
    selectorName: "Type Selector",
    doThis: "Select the cat",
    selector: "cat",
    syntax: "A",
    help: "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    examples: [
      "<strong>div</strong> selects all <tag>div</tag> elements.",
      "<strong>p</strong> selects all <tag>p</tag> elements.",
    ],
    boardMarkup: `
       <cat></cat>
       <cat></cat>
    `,
  },
  {
    level: "2",
    doThis: "Select the hat",
    selector: "hat",
    syntax: "A",
    levelTitle: "Select elements by their type",
    selectorName: "Type Selector",
    help: "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    examples: [
      "<strong>div</strong> selects all <tag>div</tag> elements.",
      "<strong>p</strong> selects all <tag>p</tag> elements.",
    ],
    boardMarkup: `
    <cat></cat>
    <hat></hat>
    <dog></dog>
    `,
  },
  {
    level: "3",
    doThis: "Select the orange cat",
    selector: "#orange",
    selectorName: "ID Selector",
    levelTitle: "Select elements with an ID",
    syntax: "#id",
    help: "Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.",
    examples: [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    boardMarkup: `
      <cat></cat>
      <cat id="orange"></cat>
      <dog></dog>
    `,
  },
  {
    level: "4",
    levelTitle: "Select an element inside another element",
    selectorName: "Descendant Selector",
    doThis: "Select the hat on the cat",
    selector: "cat hat",
    syntax: "A&nbsp;&nbsp;B",
    help: "Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.",
    examples: [
      "<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>",
      '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
    ],
    boardMarkup: `
    <dog></dog>
    <cat></cat>
    <cat><hat></hat></cat>
    <hat></hat>
    `,
  },
  {
    level: "5",
    doThis: "Select the bat on the rip tombstone",
    selector: "#orange hat",
    levelTitle: "Combine the Descendant & ID Selectors",
    syntax: "#id&nbsp;&nbsp;A",
    help: "You can combine any selector with the descendent selector.",
    examples: [
      '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
    ],
    boardMarkup: `
      <cat><hat></hat></cat>
      <cat id="orange"><hat></hat></cat>
      <dog><hat></hat></dog>
    `,
  },
  {
    level: "6",
    doThis: "Select the blue hat",
    selector: ".blue",
    selectorName: "Class Selector",
    levelTitle: "Select elements by their class",
    syntax: ".classname",
    help: "The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.",
    examples: [
      '<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>',
    ],
    boardMarkup: `
    <hat class="blue"></hat>
    <cat><hat class="blue"></hat></cat>
    <hat></hat>
    `,
  },
  {
    level: "7",
    doThis: "Select the blue hat",
    selector: "hat.blue",
    levelTitle: "Combine the Class Selector",
    syntax: "A.className",
    help: "You can combine the class selector with other selectors, like the type selector.",
    examples: [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    boardMarkup: `
      <cat id="black"><hat class="blue"></hat></cat>
      <dog><hat></hat></dog>
      <hat></hat>`,
  },
  {
    level: "8",
    doThis: "Select the blue hat on the cat",
    selector: "cat hat.blue",
    syntax: "Put your back into it!",
    levelTitle: "You can do it...",
    help: "Combine what you learned in the last few levels to solve this one!",
    boardMarkup: `
      <cat id="rip"><hat class="blue"></hat></cat>
      <dog><hat></hat></dog>
      <cat id="black"><hat class="blue"></hat></cat>
      <hat class="blue"></hat>`,
  },
  {
    level: "9",
    doThis: "Select all the dogs and hats",
    selector: "dog,hat",
    selectorName: "Comma Combinator",
    levelTitle: "Combine, selectors, with... commas!",
    syntax: "A, B",
    help: "Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.",
    examples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      "<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements",
    ],
    boardMarkup: `
      <dog></dog>
      <cat id="black"><bow class="blue"></bow></cat>
      <cat><hat></hat></cat>
    `,
  },
  {
    level: "10",
    doThis: "Select all the things!",
    selector: "*",
    selectorName: "The Universal Selector",
    levelTitle: "You can select everything!",
    syntax: "*",
    help: "You can select all elements with the universal selector! ",
    examples: [
      "<strong>p *</strong> selects any element inside all <tag>p</tag> elements.",
    ],
    boardMarkup: `
  <humster></humster>
  <cat></cat>
  <hat></hat>
  <dog class="brown"></dog>
    `,
  },
  {
    level: "11",
    doThis: "Select everything on a cat",
    selector: "cat *",
    syntax: "A&nbsp;&nbsp;*",
    levelTitle: "Combine the Universal Selector",
    help: "This selects all elements inside of <strong>A</strong>.",
    examples: [
      "<strong>p *</strong> selects every element inside all <tag>p</tag> elements.",
      '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
    ],
    boardMarkup: `
      <cat id="rip"><hat class="blue"></hat></cat>
      <cat><hat></hat></cat>
      <cat id="black"><bow class="blue"></bow></cat>
   `,
  },
  {
    level: "12",
    doThis: "Select every cat that's next to a dog",
    selector: "dog + cat",
    helpTitle: "Select an element that directly follows another element",
    selectorName: "Adjacent Sibling Selector",
    syntax: "A + B",
    help: "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. ",
    examples: [
      '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
      "<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>",
    ],
    boardMarkup: `
      <dog><bow class="blue"></bow></dog>
      <cat></cat>
      <humster></humster>
      <dog></dog>
      <cat class="orange"></cat>
    `,
  },
  {
    level: "13",
    selectorName: "General Sibling Selector",
    helpTitle: "Select elements that follows another element",
    syntax: "A ~ B",
    doThis: "Select the cats beside the mat",
    selector: "mat ~ cat",
    help: "You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.",
    examples: [
      "<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>",
    ],
    boardMarkup: `
    <mat><dog></dog></mat>
    <cat></cat>
    <cat class="small"></cat>
    <cat></cat>
    <mat><cat class="blue"></cat></mat>
    `,
  },
  {
    level: "14",
    selectorName: "Child Selector",
    syntax: "A > B&nbsp;",
    doThis: "Select the bow directly on a cat",
    selector: "cat > hat",
    helpTitle: "Select direct children of an element",
    help: "You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.",
    examples: [
      "<strong>A > B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>",
    ],
    boardMarkup: `
    <cat><hat><bow></bow></hat></cat>
    <hat></hat>
    <bow class="blue"></bow>
    <cat id="orange"><bow></bow></cat>
  `,
  },
  {
    level: "15",
    selectorName: "First Child Pseudo-selector",
    helpTitle: "Select a first child element inside of another element",
    doThis: "Select the first skull on earth",
    selector: "cat :first-child",
    syntax: ":first-child",

    help: "You can select the first child element. A child element is any element that is directly nested in another element.",
    examples: [
      "<strong>:first-child</strong> selects all first child elements.",
      "<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.",
      "<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.",
    ],
    boardMarkup: `
      <dog></dog>
      <cat>
        <hat class="blue"></hat>
        <hat class="green"></hat>
        <hat class="red"></hat>
        <hat class="black"></hat>
      </cat>
      <humster></humster>
  `,
  },
  {
    level: "16",
    selectorName: "Only Child Pseudo-selector",
    helpTitle:
      "Select an element that are the only element inside of another one.",
    doThis: "Select the bow and the hat on the cat",
    selector: "cat :only-child",
    syntax: ":only-child",
    help: "You can select any element that is the only element inside of another one.",
    examples: [
      "<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.",
      "<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>.",
    ],
    boardMarkup: `
    <cat>
      <bow />
    </cat>
    <cat>
      <hat />
    </cat>
    <humster>
      <bow />
    </humster>
    <cat>
      <hat class="blue" />
      <hat />
    </cat>
    <bow class="yellow" />
  `,
  },
  {
    level: "17",
    selectorName: "Last Child Pseudo-selector",
    helpTitle: "Select the last element inside of another element",
    doThis: "Select the last cat on mat",
    selector: "mat :last-child",
    syntax: ":last-child",
    help: "You can use this selector to select an element that is the last child element inside of another element.",
    examples: [
      "<strong>:last-child</strong> selects all last-child elements.",
      "<strong>span:last-child</strong> selects all last-child <tag>span</tag> elements.",
      "<strong>ul li:last-child</strong> selects the last <tag>li</tag> elements inside of any <tag>ul</tag>.",
    ],
    boardMarkup: `
    <mat>
      <cat class="orange"></cat>
      <cat class="brown"></cat>
      <cat class="yellow"></cat>
      <cat class="black"></cat>
    </mat>`,
  },
  {
    level: "18",
    selectorName: "Nth Child Pseudo-selector",
    helpTitle: "Select an element by its order in another element",
    doThis: "Select the second cat on the mat",
    selector: "mat :nth-child(2)",
    syntax: ":nth-child(A)",
    help: "Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.",
    examples: [
      "<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.",
      "<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>",
    ],
    boardMarkup: `
    <cat class="yellow"></cat>
    <mat>
      <cat class="smile"></cat>
      <cat class="smile"></cat>
      <cat class="smile"></cat>
      <cat class="smile"></cat>
    </mat>
    <cat class="black"></cat>
  `,
  },
];

export default levels;
