export const levels = [
  {
    isDone: false,
    level: "1",
    selectorName: "Type Selector",
    levelTitle: "Select elements by their type",
    syntax: "A",
    description:
      "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    examples: [
      "<strong>div</strong> selects all <tag>div</tag> elements.",
      "<strong>p</strong> selects all <tag>p</tag> elements.",
    ],
    html: `
       <cat></cat>
       <cat></cat>
    `,
    task: "Select the cat",
    selector: "cat",
  },
  {
    isDone: false,
    level: "2",
    task: "Select the hat",
    selector: "hat",
    syntax: "A",
    levelTitle: "Select elements by their type",
    selectorName: "Type Selector",
    description:
      "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    examples: [
      "<strong>div</strong> selects all <tag>div</tag> elements.",
      "<strong>p</strong> selects all <tag>p</tag> elements.",
    ],
    html: `
    <cat></cat>
    <hat></hat>
    <dog></dog>
    `,
  },
  {
    isDone: false,
    level: "3",
    task: "Select the orange cat",
    selector: "#orange",
    selectorName: "ID Selector",
    levelTitle: "Select elements with an ID",
    syntax: "#id",
    description:
      "Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.",
    examples: [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    html: `
      <cat></cat>
      <cat id="orange"></cat>
      <dog></dog>
    `,
  },
  {
    isDone: false,
    level: "4",
    levelTitle: "Select an element inside another element",
    selectorName: "Descendant Selector",
    task: "Select the hat on the cat",
    selector: "cat hat",
    syntax: "A&nbsp;&nbsp;B",
    description:
      "Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.",
    examples: [
      "<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>",
      '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
    ],
    html: `
    <dog></dog>
    <cat></cat>
    <cat><hat></hat></cat>
    <hat></hat>
    `,
  },
  {
    isDone: false,
    level: "5",
    task: "Select the hat on the orange cat",
    selector: "#orange hat",
    selectorName: "",
    levelTitle: "Combine the Descendant & ID Selectors",
    syntax: "#id&nbsp;&nbsp;A",
    description: "You can combine any selector with the descendent selector.",
    examples: [
      '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
    ],
    html: `
      <cat><hat></hat></cat>
      <cat id="orange"><hat></hat></cat>
      <dog><hat></hat></dog>
    `,
  },
  {
    isDone: false,
    level: "6",
    task: "Select the blue hat",
    selector: ".blue",
    selectorName: "Class Selector",
    levelTitle: "Select elements by their class",
    syntax: ".classname",
    description:
      "The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.",
    examples: [
      '<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>',
    ],
    html: `
    <hat class="blue"></hat>
    <cat><hat class="blue"></hat></cat>
    <hat></hat>
    `,
  },
  {
    isDone: false,
    level: "7",
    task: "Select the blue hat",
    selectorName: "",
    selector: "hat.blue",
    levelTitle: "Combine the Class Selector",
    syntax: "A.className",
    description:
      "You can combine the class selector with other selectors, like the type selector.",
    examples: [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    html: `
      <cat id="black"><hat class="blue"></hat></cat>
      <dog><hat></hat></dog>
      <hat></hat>`,
  },
  {
    isDone: false,
    level: "8",
    task: "Select the blue hat on the cat",
    selectorName: "",
    selector: "cat hat.blue",
    syntax: "Put your back into it!",
    levelTitle: "You can do it...",
    description:
      "Combine what you learned in the last few levels to solve this one!",
    examples: [],
    html: `
      <cat id="orange"><hat class="blue"></hat></cat>
      <dog><hat></hat></dog>
      <cat id="black"><hat class="blue"></hat></cat>
      <hat class="blue"></hat>`,
  },
  {
    isDone: false,
    level: "9",
    task: "Select all the dogs and hats",
    selector: "dog,hat",
    selectorName: "Comma Combinator",
    levelTitle: "Combine, selectors, with... commas!",
    syntax: "A, B",
    description:
      "Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.",
    examples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      "<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements",
    ],
    html: `
      <dog></dog>
      <cat id="black"><bow class="blue"></bow></cat>
      <cat><hat></hat></cat>
    `,
  },
  {
    isDone: false,
    level: "10",
    task: "Select all the things!",
    selector: "*",
    selectorName: "The Universal Selector",
    levelTitle: "You can select everything!",
    syntax: "*",
    description: "You can select all elements with the universal selector! ",
    examples: [
      "<strong>p *</strong> selects any element inside all <tag>p</tag> elements.",
    ],
    html: `
  <humster></humster>
  <cat></cat>
  <hat></hat>
  <dog class="brown"></dog>
    `,
  },
  {
    isDone: false,
    level: "11",
    task: "Select everything on a cat",
    selector: "cat *",
    syntax: "A&nbsp;&nbsp;*",
    levelTitle: "Combine the Universal Selector",
    selectorName: "",
    description: "This selects all elements inside of <strong>A</strong>.",
    examples: [
      "<strong>p *</strong> selects every element inside all <tag>p</tag> elements.",
      '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
    ],
    html: `
      <cat id="orange"><hat class="blue"></hat></cat>
      <cat><hat></hat></cat>
      <cat id="black"><bow class="blue"></bow></cat>
   `,
  },
  {
    isDone: false,
    level: "12",
    task: "Select every cat that's next to a dog",
    selector: "dog + cat",
    levelTitle: "Select an element that directly follows another element",
    selectorName: "Adjacent Sibling Selector",
    syntax: "A + B",
    description:
      "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. ",
    examples: [
      '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
      "<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>",
    ],
    html: `
      <dog><bow class="blue"></bow></dog>
      <cat></cat>
      <humster></humster>
      <dog></dog>
      <cat class="orange"></cat>
    `,
  },
  {
    isDone: false,
    level: "13",
    selectorName: "General Sibling Selector",
    levelTitle: "Select elements that follows another element",
    syntax: "A ~ B",
    task: "Select the cats beside the mat",
    selector: "mat ~ cat",
    description:
      "You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.",
    examples: [
      "<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>",
    ],
    html: `
    <mat><dog></dog></mat>
    <cat></cat>
    <cat class="small"></cat>
    <cat></cat>
    <mat><cat class="blue"></cat></mat>
    `,
  },
  {
    isDone: false,
    level: "14",
    selectorName: "Child Selector",
    syntax: "A > B&nbsp;",
    task: "Select the bow directly on a cat",
    selector: "cat > bow",
    levelTitle: "Select direct children of an element",
    description:
      "You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.",
    examples: [
      "<strong>A > B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>",
    ],
    html: `
    <cat><hat><bow></bow></hat></cat>
    <hat></hat>
    <bow class="blue"></bow>
    <cat id="orange"><bow></bow></cat>
  `,
  },
  {
    isDone: false,
    level: "15",
    selectorName: "First Child Pseudo-selector",
    levelTitle: "Select a first child element inside of another element",
    task: "Select the first hat on cat",
    selector: "cat :first-child",
    syntax: ":first-child",

    description:
      "You can select the first child element. A child element is any element that is directly nested in another element.",
    examples: [
      "<strong>:first-child</strong> selects all first child elements.",
      "<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.",
      "<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.",
    ],
    html: `
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
    isDone: false,
    level: "16",
    selectorName: "Only Child Pseudo-selector",
    levelTitle:
      "Select an element that are the only element inside of another one.",
    task: "Select the bow and the hat on the cat",
    selector: "cat :only-child",
    syntax: ":only-child",
    description:
      "You can select any element that is the only element inside of another one.",
    examples: [
      "<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.",
      "<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>.",
    ],
    html: `
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
    isDone: false,
    level: "17",
    selectorName: "Last Child Pseudo-selector",
    levelTitle: "Select the last element inside of another element",
    task: "Select the last cat on mat",
    selector: "mat :last-child",
    syntax: ":last-child",
    description:
      "<p>You can use this selector to select an element that is the last child element inside of another element.</p></br><p>Pro Tip → In cases where there is only one element, that element counts as the first-child, only-child and last-child!</p>",
    examples: [
      "<strong>:last-child</strong> selects all last-child elements.",
      "<strong>span:last-child</strong> selects all last-child <tag>span</tag> elements.",
      "<strong>ul li:last-child</strong> selects the last <tag>li</tag> elements inside of any <tag>ul</tag>.",
    ],
    html: `
    <mat>
      <cat class="orange"></cat>
      <cat class="brown"></cat>
      <cat class="yellow"></cat>
      <cat class="black"></cat>
    </mat>`,
  },
  {
    isDone: false,
    level: "18",
    selectorName: "Nth Child Pseudo-selector",
    levelTitle: "Select an element by its order in another element",
    task: "Select the second cat on the mat",
    selector: "mat :nth-child(2)",
    syntax: ":nth-child(A)",
    description:
      "Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.",
    examples: [
      "<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.",
      "<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>",
    ],
    html: `
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
