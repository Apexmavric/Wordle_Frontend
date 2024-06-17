import { useEffect, useRef, useState } from "react";
import LeaderBoard from "../components/Leaderboard";

const AnimationTester = () => {
    const backgroundRef = useRef(null);
    useEffect(() => {
        const currentBackgroundRef = backgroundRef.current;
        if(currentBackgroundRef)
        {
            currentBackgroundRef.classList.add('back-animate');
        }
        return () => {
            if (currentBackgroundRef) {
                currentBackgroundRef.classList.remove('final-state');
            }
        };
    }, [backgroundRef]);
    
    return (
        <div className="animation-tester-container">
            <div className="animation-background" ref={backgroundRef}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare massa eget. Urna et pharetra pharetra massa. Ac feugiat sed lectus vestibulum mattis. Feugiat nisl pretium fusce id velit. Nullam non nisi est sit amet facilisis magna etiam tempor. Nisi lacus sed viverra tellus in. Fames ac turpis egestas maecenas. Cum sociis natoque penatibus et magnis dis parturient. Augue lacus viverra vitae congue eu consequat ac felis. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Molestie a iaculis at erat.

            Arcu odio ut sem nulla pharetra diam sit. Pellentesque nec nam aliquam sem et. Purus gravida quis blandit turpis cursus in hac. Aliquam ultrices sagittis orci a scelerisque purus. A pellentesque sit amet porttitor eget dolor. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Massa sed elementum tempus egestas sed sed. Amet aliquam id diam maecenas ultricies mi eget. Diam ut venenatis tellus in metus vulputate. Gravida rutrum quisque non tellus. Amet venenatis urna cursus eget nunc scelerisque. Dictum non consectetur a erat nam at lectus urna duis. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Nulla facilisi etiam dignissim diam quis enim lobortis. Dui ut ornare lectus sit. Quis commodo odio aenean sed adipiscing diam.

            Id eu nisl nunc mi ipsum faucibus vitae. A cras semper auctor neque vitae tempus. Donec pretium vulputate sapien nec sagittis aliquam. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. Id velit ut tortor pretium viverra suspendisse potenti. Velit dignissim sodales ut eu sem integer vitae justo. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Tincidunt nunc pulvinar sapien et ligula. In est ante in nibh mauris cursus mattis molestie. Risus ultricies tristique nulla aliquet. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Laoreet suspendisse interdum consectetur libero id. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Sit amet justo donec enim diam vulputate ut. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Tortor pretium viverra suspendisse potenti nullam ac. Pellentesque habitant morbi tristique senectus et. Lacus viverra vitae congue eu consequat ac felis. Elit eget gravida cum sociis natoque penatibus et. Blandit massa enim nec dui nunc mattis enim ut tellus.

            Nam at lectus urna duis convallis convallis tellus id interdum. Sollicitudin aliquam ultrices sagittis orci a. Id ornare arcu odio ut. Praesent tristique magna sit amet. Quis auctor elit sed vulputate. Tincidunt augue interdum velit euismod in pellentesque massa placerat duis. Massa placerat duis ultricies lacus sed. Morbi tempus iaculis urna id volutpat lacus laoreet non. Accumsan lacus vel facilisis volutpat est velit. Dui ut ornare lectus sit amet est. Condimentum vitae sapien pellentesque habitant morbi tristique. Gravida quis blandit turpis cursus in. Nisl nunc mi ipsum faucibus. At quis risus sed vulputate odio ut. Molestie at elementum eu facilisis sed. Interdum posuere lorem ipsum dolor. Praesent tristique magna sit amet purus gravida quis. Malesuada fames ac turpis egestas sed. A diam sollicitudin tempor id eu. Ipsum suspendisse ultrices gravida dictum.

            Sed adipiscing diam donec adipiscing tristique risus nec. Ante in nibh mauris cursus mattis molestie a iaculis. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Risus quis varius quam quisque id diam vel quam. Quam vulputate dignissim suspendisse in est. Eget nullam non nisi est sit amet facilisis. Eleifend donec pretium vulputate sapien nec sagittis. Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing. In est ante in nibh mauris cursus mattis molestie a. Enim ut sem viverra aliquet eget sit amet tellus. Pulvinar mattis nunc sed blandit libero. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Dolor sit amet consectetur adipiscing. Ut ornare lectus sit amet est placerat. Felis donec et odio pellentesque diam volutpat commodo sed egestas.
            </div>
        </div>
    )

}
export default AnimationTester;