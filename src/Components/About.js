import React from "react";
import { aboutStyles } from "../Styles/ComponentsStyle";

const About = () => {
  const { container, header, info } = aboutStyles;
  return (
    <div style={container}>
      <div style={header}>Hakımızda</div>
      <div style={info}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nibh
        nisl, dignissim eget ornare non, placerat in sapien. Curabitur ac justo
        rutrum, cursus nulla non, dignissim nisl. Nunc fermentum, sem vel luctus
        consectetur, enim augue sagittis libero, interdum vulputate metus eros
        sit amet nulla. Ut facilisis, magna quis volutpat volutpat, justo diam
        maximus dui, eu laoreet lacus orci a quam. Morbi gravida enim in
        ultricies tristique. Phasellus rutrum pretium velit a lacinia. Donec eu
        mi ac velit tincidunt semper. Nullam sem urna, vestibulum a cursus non,
        consectetur at diam. Proin faucibus aliquam tortor. Nullam dapibus neque
        arcu, eget ultrices eros posuere id. Donec ultrices posuere quam, a
        aliquet purus lacinia id. Mauris commodo condimentum neque. Maecenas
        aliquet metus et leo cursus semper. Aliquam aliquet at metus a sodales.
        Cras laoreet commodo eros. Duis id sollicitudin est. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Integer vel sagittis quam. Pellentesque tincidunt vehicula faucibus.
        Quisque aliquet dapibus augue, vitae varius augue euismod at. In nec
        consectetur felis, eget convallis ex. Vivamus ex risus, rhoncus sit amet
        erat non, rhoncus iaculis massa. Nulla cursus tincidunt bibendum. Aenean
        ultricies vel urna a cursus. Ut pharetra, nisl vel vehicula faucibus, ex
        mauris accumsan urna, a lacinia urna purus ac lorem.
      </div>
    </div>
  );
};
export default About;
