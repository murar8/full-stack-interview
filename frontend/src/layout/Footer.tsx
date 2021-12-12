import { Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FooterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export default function Footer() {
  return (
    <Stack
      component={Paper}
      elevation={1}
      borderRadius={0}
      spacing={2}
      px={4}
      py={2}
    >
      <FooterText variant="body1" fontFamily="Fira Code">
        Full Stack Interview
      </FooterText>
      <FooterText variant="body2">
        © 2021 Lorenzo Murarotto. All Rights Reserved.
      </FooterText>
    </Stack>
  );
}
