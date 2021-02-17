import { Backdrop } from "@material-ui/core";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import MuiDialogTitle, {
  DialogTitleProps,
} from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { BridgePurePaper } from "../layout/Paper";

export const useBridgeModalTitleStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  titleWrapper: {
    flexGrow: 1,
    paddingLeft: 30, // compensating close icon for visual text centering
    textAlign: "center",
  },
  title: {},
  customContentWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  closeButtonWrapper: {
    minWidth: 30,
  },
  closeButton: {
    color: theme.palette.grey[600],
  },
}));

type BridgeModalTitleProps = DialogTitleProps & Pick<DialogProps, "onClose">;

export const BridgeModalTitle: FunctionComponent<BridgeModalTitleProps> = ({
  title,
  onClose,
  className,
  children,
}) => {
  const styles = useBridgeModalTitleStyles();
  const onCustomClose = () => {
    if (onClose) {
      onClose({}, "backdropClick");
    }
  };
  return (
    <MuiDialogTitle
      disableTypography
      className={classNames(className, styles.dialogTitle)}
    >
      {title && (
        <div className={styles.titleWrapper}>
          <Typography variant="body1" className={styles.title}>
            {title}
          </Typography>
        </div>
      )}
      {children && (
        <div className={styles.customContentWrapper}>{children}</div>
      )}
      <div className={styles.closeButtonWrapper}>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={styles.closeButton}
            onClick={onCustomClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
};

export const BridgeModal: FunctionComponent<DialogProps> = ({
  title,
  open,
  onClose,
  children,
  maxWidth,
}) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth={maxWidth}>
      <BridgeModalTitle onClose={onClose} title={title} />
      {children}
    </Dialog>
  );
};

const useNestedDrawerStyles = makeStyles((theme) => ({
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: "auto",
  },
  positioner: {
    position: "relative",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  paper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
}));

type NestedDrawerProps = DialogProps & {
  open: boolean;
};

const stopPropagation = (event: any) => {
  event.stopPropagation();
};

export const NestedDrawer: FunctionComponent<NestedDrawerProps> = ({
  open,
  onClose,
  title,
  className,
  children,
}) => {
  const styles = useNestedDrawerStyles();
  const resolvedClassName = classNames(className, styles.paper);

  return (
    <Backdrop className={styles.backdrop} open={open} onClick={onClose as any}>
      <BridgePurePaper className={resolvedClassName} onClick={stopPropagation}>
        {title && <BridgeModalTitle onClose={onClose} title={title} />}
        {children}
      </BridgePurePaper>
    </Backdrop>
  );
};