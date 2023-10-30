import { useEffect } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const MODAL_HEIGHT = screenHeight * 0.5;

export const Modal = ({ onClose, showModal, children, style }: ModalProps) => {
  const overlayOpacity = useSharedValue(0.5);
  const height = useSharedValue(MODAL_HEIGHT);
  const overlayHeight = useSharedValue(screenHeight);
  const display = useSharedValue("none");
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (showModal) {
      modalStartAnimation();
    } else {
      modalEndingAnimation();
    }
  }, [showModal]);

  const modalStartAnimation = () => {
    "worklet";
    display.value = withSpring("flex");
    overlayOpacity.value = withSpring(0.5);
    height.value = withSpring(MODAL_HEIGHT);
    overlayHeight.value = withTiming(screenHeight);
  };

  const modalEndingAnimation = () => {
    "worklet";
    display.value = withSpring("none");
    overlayOpacity.value = withSpring(0);
    height.value = withSpring(0);
    overlayHeight.value = withTiming(0);
  };

  const handleTapGesture =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: () => {
        height.value = withSpring(0);
        overlayHeight.value = withTiming(0);
        overlayOpacity.value = withSpring(0);
      },
      onFinish: () => {
        display.value = withSpring("none");
        // onClose(); //app crashning
      },
    });

  const panGestureEventHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        overlayOpacity.value = 0.5 - event.translationY / MODAL_HEIGHT;
        translateY.value = event.translationY;
      },
      onFinish: (event) => {
        translateY.value = withSpring(0);
        overlayOpacity.value = withTiming(0.5);

        const shouldBeDismissed = event.translationY > MODAL_HEIGHT * 0.3;

        if (shouldBeDismissed) {
          modalEndingAnimation();
          runOnJS(onClose)();
        }
      },
    });

  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const rAnimatedOverlayStyle = useAnimatedStyle(() => {
    return {
      display: display.value as "flex" | "none",
      height: overlayHeight.value,
      opacity: Math.min(overlayOpacity.value, 0.5),
    };
  });

  const rAnimatedDisplayStyle = useAnimatedStyle(() => {
    return {
      display: display.value as "flex" | "none",
      transform: [
        { translateY: Math.min(MODAL_HEIGHT, Math.max(translateY.value, 0)) },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[styles.overlay, rAnimatedOverlayStyle]} />
      <PanGestureHandler onGestureEvent={panGestureEventHandler}>
        <Animated.View style={rAnimatedDisplayStyle}>
          <Animated.View style={[style, rAnimatedStyle]}>
            <TapGestureHandler onGestureEvent={handleTapGesture}>
              <Animated.View style={styles.closeBtn}>
                <TouchableOpacity onPress={onClose}>
                  <AntDesign name="closecircleo" size={22} color="#303030" />
                </TouchableOpacity>
              </Animated.View>
            </TapGestureHandler>
            {children}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export const ModalContent = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return <View style={style}>{children}</View>;
};

const styles = StyleSheet.create({
  overlay: {
    width: screenWidth,
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "black",
  },
  closeBtn: {
    position: "absolute",
    top: 18,
    right: 14,
    zIndex: 9999,
  },
});
